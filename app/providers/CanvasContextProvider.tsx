"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import CanvasContext, { ICanvasContext, TCanvasDatas, TCanvasProperties } from "./CanvasContext";
import CryptoJS from "crypto-js";

const _key = process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY ?? "secret_key";

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
    //
    const canvas = useRef<HTMLCanvasElement>(null);

    const [canvasProperties, setCanvasProperties] = useState<TCanvasProperties>({
        width: 360,
        height: 360,
        pixelSize: 6,
        availableColors: ["#000000", "#ff0000", "#00ff00", "#0000ff"],
    });

    const [canvasDatas, setCanvasDatas] = useState<TCanvasDatas>({
        pixelData: {},
        history: [],
        backgroundColor: "#ffffff",
        currentColor: "black",
    });

    useEffect(() => {
        const decryptLocalStorage = async () => {
            let canvasData = {
                pixelData: {},
                history: [],
                backgroundColor: canvasProperties.availableColors[0],
                currentColor: canvasProperties.availableColors[1],
            };

            if (localStorage.getItem("basecanvas")) {
                const encryptedData = localStorage.getItem("basecanvas") ?? "";
                const decryptedData = await decryptCanvasData(encryptedData);
                if (
                    decryptedData.hasOwnProperty("pixelData") &&
                    decryptedData.hasOwnProperty("history") &&
                    decryptedData.hasOwnProperty("backgroundColor") &&
                    decryptedData.hasOwnProperty("currentColor")
                )
                    canvasData = decryptedData || canvasData;
            }

            setCanvasDatas(canvasData);
        };

        decryptLocalStorage();
    }, [canvasProperties.availableColors]);

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

            return { ...prev, pixelData: { ...pixelData } };
        });
    };

    const addHistory = (data: Record<string, string>) => {
        setCanvasDatas((prev) => {
            const last = { ...data };
            const canvasData = { ...prev, history: [...prev.history, last] };
            updateLocalStorage(canvasData);
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
            const canvasData = { ...prev, history: history.slice(0, -1), pixelData: { ...pixelData } };
            updateLocalStorage(canvasData);
            return {
                ...prev,
                history: history.slice(0, -1),
                pixelData: { ...pixelData },
            };
        });
    };

    const clearCanvas = () => {
        setCanvasDatas((prev) => {
            const canvasData = { ...prev, pixelData: {}, history: [] };
            updateLocalStorage(canvasData);
            return { ...prev, pixelData: {}, history: [] };
        });
    };
    /* Undo and Clear Function */

    /* Change Background Color and Color Functions */
    const changeBackgroundColor = (color: string) => {
        setCanvasDatas((prev) => {
            const canvasData = { ...prev, backgroundColor: color };
            updateLocalStorage(canvasData);
            return { ...prev, backgroundColor: color };
        });
    };

    const changeColor = (color: string) => {
        setCanvasDatas((prev) => {
            const canvasData = { ...prev, currentColor: color };
            updateLocalStorage(canvasData);
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

    const updateLocalStorage = async (data?: TCanvasDatas) => {
        if (!data) {
            localStorage.setItem("basecanvas", await encryptCanvasData(canvasDatas));
            return;
        }
        localStorage.setItem("basecanvas", await encryptCanvasData(data));
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
        updateLocalStorage,
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

async function encryptCanvasData(data: TCanvasDatas) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), _key).toString();
}

async function decryptCanvasData(data: string) {
    try {
        const bytes = CryptoJS.AES.decrypt(data, _key);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        console.error(e);
        return {};
    }
}

export default CanvasContextProvider;
