"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import CanvasContext, { ICanvasContext, TCanvasDatas, TCanvasProperties } from "./CanvasContext";
import CryptoJS from "crypto-js";

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
    //
    const _key = process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY ?? "secret_key";
    const canvas = useRef<HTMLCanvasElement>(null);

    const [canvasProperties, setCanvasProperties] = useState<TCanvasProperties>({
        width: 400,
        height: 400,
        pixelSize: 10,
        availableColors: ["#000000", "#ff0000", "#00ff00", "#0000ff"],
    });

    const [canvasDatas, setCanvasDatas] = useState<TCanvasDatas>({
        pixelData: {},
        history: [],
        backgroundColor: "#ffffff",
        currentColor: "black",
    });

    useEffect(() => {
        setCanvasDatas(
            JSON.parse(
                CryptoJS.AES.decrypt(localStorage.getItem("basecanvas") ?? "", _key).toString(CryptoJS.enc.Utf8) ||
                    JSON.stringify({
                        pixelData: {},
                        history: [],
                        backgroundColor: canvasProperties.availableColors[0],
                        currentColor: canvasProperties.availableColors[1],
                    })
            )
        );
    }, [canvasProperties.availableColors, _key]);

    useEffect(() => {
        //
        if (!canvas || !canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = canvasDatas.backgroundColor;
        ctx.fillRect(0, 0, canvasProperties.width, canvasProperties.height);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";

        for (let x = 0; x < 100000; x += canvasProperties.pixelSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasProperties.height);
            ctx.stroke();
        }

        for (let y = 0; y < 100000; y += canvasProperties.pixelSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasProperties.width, y);
            ctx.stroke();
        }

        for (const [key, value] of Object.entries(canvasDatas.pixelData)) {
            const [x, y] = key.split(",").map((val) => parseInt(val));
            if (!value.length) continue;
            ctx.fillStyle = value[value.length - 1];
            ctx.fillRect(
                x * canvasProperties.pixelSize,
                y * canvasProperties.pixelSize,
                canvasProperties.pixelSize,
                canvasProperties.pixelSize
            );
        }
    }, [canvasDatas, canvasProperties]);

    const addPixel = (data: Record<string, string>) => {
        const dataKey = Object.keys(data)[0];
        const dataValue = Object.values(data)[0];

        setCanvasDatas((prev) => {
            const pixelData = { ...prev.pixelData };
            if (!pixelData[dataKey]) {
                pixelData[dataKey] = [dataValue];
                return { ...prev, pixelData: { ...pixelData } };
            }
            if (pixelData[dataKey][pixelData[dataKey].length - 1] !== dataValue || !dataValue) {
                pixelData[dataKey] = pixelData[dataKey] ? [...pixelData[dataKey], dataValue] : [dataValue];
            }
            const canvasData = JSON.stringify({ ...prev, pixelData: { ...pixelData } });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return { ...prev, pixelData: { ...pixelData } };
        });
    };

    const addHistory = (data: Record<string, string>) => {
        setCanvasDatas((prev) => {
            const last = { ...data };
            const canvasData = JSON.stringify({ ...prev, history: [...prev.history, last] });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return { ...prev, history: [...prev.history, last] };
        });
    };

    /* Undo and Clear Function */
    const undoPixels = (last: Record<string, string>) => {
        setCanvasDatas((prev) => {
            const pixelData = { ...prev.pixelData };
            const history = [...prev.history];
            Object.keys(last).forEach((key) => {
                if (!pixelData[key]) return;
                if (pixelData[key].length < 2) {
                    delete pixelData[key];
                    return;
                }
                if (pixelData[key]) {
                    pixelData[key].pop();
                }
            });
            const canvasData = JSON.stringify({ ...prev, history: history.slice(0, -1), pixelData: { ...pixelData } });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return {
                ...prev,
                history: history.slice(0, -1),
                pixelData: { ...pixelData },
            };
        });
    };
    /* Undo and Clear Function */

    const clearCanvas = () => {
        setCanvasDatas((prev) => {
            const canvasData = JSON.stringify({ ...prev, pixelData: {}, history: [] });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return { ...prev, pixelData: {}, history: [] };
        });
    };

    /* Change Background Color and Color Functions */
    const changeBackgroundColor = (color: string) => {
        setCanvasDatas((prev) => {
            const canvasData = JSON.stringify({ ...prev, backgroundColor: color });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return { ...prev, backgroundColor: color };
        });
    };

    const changeColor = (color: string) => {
        setCanvasDatas((prev) => {
            const canvasData = JSON.stringify({ ...prev, currentColor: color });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return { ...prev, currentColor: color };
        });
    };
    /* Change Background Color and Color Functions */

    /* Zoom Functions */
    const zoomIn = () => {
        setCanvasProperties((prev) => {
            return { ...prev, pixelSize: prev.pixelSize * 2.0, width: prev.width * 2.0, height: prev.height * 2.0 };
        });
    };

    const zoomOut = () => {
        setCanvasProperties((prev) => {
            return { ...prev, pixelSize: prev.pixelSize / 2.0, width: prev.width / 2.0, height: prev.height / 2.0 };
        });
    };
    /* Zoom Functions */

    // Update available colors and set the current color and background color
    const updateAvailableColors = (colors: string[]) => {
        setCanvasProperties((prev) => {
            return { ...prev, availableColors: colors };
        });
    };

    const values: ICanvasContext = {
        canvas,
        canvasProperties,
        canvasDatas,
        addPixel,
        addHistory,
        undoPixels,
        clearCanvas,
        changeBackgroundColor,
        updateAvailableColors,
        changeColor,
        zoomIn,
        zoomOut,
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
