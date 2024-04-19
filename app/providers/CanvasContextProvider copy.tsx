"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import CanvasContext, { ICanvasContext, TCanvasDatas } from "./CanvasContext";
import CryptoJS from "crypto-js";

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
    //
    const _key = process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY ?? "secret_key";
    const canvas = useRef<HTMLCanvasElement>(null);

    const [canvasDatas, setCanvasDatas] = useState<TCanvasDatas>({
        pixelData: {},
        history: [],
        backgroundColor: "white",
        currentColor: "black",
    });

    const [availableColors, setavAilableColors] = useState<string[]>([
        "#000000",
        "#ff0000",
        "#00ff00",
        "#0000ff",
        "#ff00ff",
        "#00ffff",
    ]);

    const [canvasWidth, setCanvasWidth] = useState(450);
    const [canvasHeight, setCanvasHeight] = useState(450);
    const [pixelSize, setPixelSize] = useState(7.5);

    useEffect(() => {
        setCanvasDatas(
            JSON.parse(
                CryptoJS.AES.decrypt(localStorage.getItem("basecanvas") ?? "", _key).toString(CryptoJS.enc.Utf8) ||
                    JSON.stringify({
                        pixelData: {},
                        history: [],
                        backgroundColor: availableColors[1],
                        currentColor: availableColors[0],
                    })
            )
        );
    }, [availableColors, _key]);

    useEffect(() => {
        if (!canvas || !canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = canvasDatas.backgroundColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.07)";

        for (let x = 0; x < 100000; x += pixelSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
            ctx.stroke();
        }

        for (let y = 0; y < 100000; y += pixelSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvasWidth, y);
            ctx.stroke();
        }

        for (const [key, value] of Object.entries(canvasDatas.pixelData)) {
            const [x, y] = key.split(",").map((val) => parseInt(val));
            ctx.fillStyle = value;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }, [canvas, canvasDatas.pixelData, pixelSize, canvasWidth, canvasHeight, canvasDatas.backgroundColor]);

    const addPixel = (data: Record<string, string>) => {
        setCanvasDatas((prev) => {
            const canvasData = JSON.stringify({ ...prev, pixelData: { ...prev.pixelData, ...data } });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return { ...prev, pixelData: { ...prev.pixelData, ...data } };
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

    const undoPixels = (last: Record<string, string>) => {
        setCanvasDatas((prev) => {
            const next = { ...prev, pixelData: { ...prev.pixelData } };
            Object.keys(last).forEach((key) => {
                delete next.pixelData[key];
            });
            const canvasData = JSON.stringify(next);
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return next;
        });
    };

    const updateAvailableColors = (colors: string[]) => {
        setavAilableColors(colors);
    };

    const clearCanvas = () => {
        setCanvasDatas((prev) => {
            const canvasData = JSON.stringify({ ...prev, pixelData: {}, history: [] });
            localStorage.setItem("basecanvas", CryptoJS.AES.encrypt(canvasData, _key).toString());
            return { ...prev, pixelData: {}, history: [] };
        });
    };

    const zoomIn = () => {
        setPixelSize((prev) => prev * 1.2);
        setCanvasWidth((prev) => prev * 1.2);
        setCanvasHeight((prev) => prev * 1.2);
    };

    const zoomOut = () => {
        setPixelSize((prev) => prev / 1.2);
        setCanvasWidth((prev) => prev / 1.2);
        setCanvasHeight((prev) => prev / 1.2);
    };

    const values: ICanvasContext = {
        canvas,
        canvasDatas,
        canvasWidth,
        canvasHeight,
        changeBackgroundColor,
        updateAvailableColors,
        pixelSize,
        addPixel,
        changeColor,
        addHistory,
        undoPixels,
        zoomIn,
        zoomOut,
        clearCanvas,
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
