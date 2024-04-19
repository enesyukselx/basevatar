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
        backgroundColor: "#ffffff",
        currentColor: "black",
    });

    const [canvasDatas, setCanvasDatas] = useState<TCanvasDatas>({
        pixelData: {},
        history: [],
    });

    useEffect(() => {
        //
        if (!canvas || !canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = canvasProperties.backgroundColor;
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
            ctx.fillStyle = value[value.length - 1];
            ctx.fillRect(
                x * canvasProperties.pixelSize,
                y * canvasProperties.pixelSize,
                canvasProperties.pixelSize,
                canvasProperties.pixelSize
            );
        }
    }, [canvasDatas.pixelData, canvasProperties]);

    const addPixel = (data: Record<string, string>) => {
        const dataKey = Object.keys(data)[0];
        const dataValue = Object.values(data)[0];

        setCanvasDatas((prev) => {
            const pixelData = { ...prev.pixelData };
            if (
                !pixelData[dataKey] ||
                (pixelData[dataKey] &&
                    (!pixelData[dataKey].includes(dataValue) ||
                        pixelData[dataKey][pixelData[dataKey].length - 2] === dataValue))
            ) {
                pixelData[dataKey] = pixelData[dataKey] ? [...pixelData[dataKey], dataValue] : [dataValue];
            }
            return { ...prev, pixelData: { ...pixelData } };
        });
    };

    const addHistory = (data: Record<string, string>) => {
        setCanvasDatas((prev) => {
            const last = { ...data };
            return { ...prev, history: [...prev.history, last] };
        });
    };

    /* Undo functions */
    const undoWithClick = (x: number, y: number) => {
        setCanvasDatas((prev) => {
            const history = [...prev.history];
            const pixelData = { ...prev.pixelData };

            if (!pixelData[`${x},${y}`]) return { pixelData, history };
            if (pixelData[`${x},${y}`].length === 1) {
                delete pixelData[`${x},${y}`];
                return { pixelData, history };
            }

            const lastEl = pixelData[`${x},${y}`].pop();
            if (lastEl) addHistory({ [`${x},${y}`]: lastEl ?? "" });
            pixelData[`${x},${y}`].pop();
            return { pixelData, history };
        });
    };

    /* Change Background Color and Color Functions */
    const changeBackgroundColor = (color: string) => {
        setCanvasProperties((prev) => {
            return { ...prev, backgroundColor: color };
        });
    };

    const changeColor = (color: string) => {
        setCanvasProperties((prev) => {
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
            return { ...prev, backgroundColor: colors[0], currentColor: colors[1], availableColors: colors };
        });
    };

    const values: ICanvasContext = {
        canvas,
        canvasProperties,
        canvasDatas,
        addPixel,
        addHistory,
        undoWithClick,
        changeBackgroundColor,
        updateAvailableColors,
        changeColor,
        zoomIn,
        zoomOut,
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
