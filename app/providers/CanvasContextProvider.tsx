"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import CanvasContext, { ICanvasContext } from "./CanvasContext";

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
    //
    const canvas = useRef<HTMLCanvasElement>(null);
    const [canvasWidth, setCanvasWidth] = useState(300);
    const [canvasHeight, setCanvasHeight] = useState(300);
    const [pixelSize, setPixelSize] = useState(5);
    //

    const [pixelData, setPixelData] = useState<Record<string, string>>({});
    const [currentColor, setCurrentColor] = useState<string>("black");
    const [history, setHistory] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        setHistory(JSON.parse(localStorage.getItem("history") || "[]"));
        setPixelData(JSON.parse(localStorage.getItem("pixels") || "{}"));
    }, []);

    useEffect(() => {
        if (!canvas || !canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "white";
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

        for (const [key, value] of Object.entries(pixelData)) {
            const [x, y] = key.split(",").map((val) => parseInt(val));
            ctx.fillStyle = value;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }, [canvas, pixelData, pixelSize, canvasWidth, canvasHeight]);

    const changeColor = (color: string) => {
        setCurrentColor(color);
    };

    const addHistory = (data: Record<string, string>) => {
        setHistory((prev) => {
            const last = { ...data };
            const localHistory = JSON.stringify([...prev, last]);
            localStorage.setItem("history", localHistory);
            return [...prev, last];
        });
    };

    const undoPixels = (last: Record<string, string>) => {
        setPixelData((prev) => {
            const next = { ...prev };
            Object.keys(last).forEach((key) => {
                delete next[key];
            });
            const pixels = JSON.stringify(next);
            localStorage.setItem("pixels", pixels);

            return next;
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

    const addPixel = (data: Record<string, string>) => {
        setPixelData((prev) => {
            const pixels = JSON.stringify({ ...prev, ...data });
            localStorage.setItem("pixels", pixels);
            return { ...prev, ...data };
        });
    };

    const clearCanvas = () => {
        setPixelData({});
        localStorage.setItem("pixels", "{}");
        localStorage.setItem("history", "[]");
    };

    const values: ICanvasContext = {
        canvas,
        canvasWidth,
        canvasHeight,
        pixelSize,
        pixelData,
        addPixel,
        currentColor,
        changeColor,
        history,
        addHistory,
        undoPixels,
        zoomIn,
        zoomOut,
        clearCanvas,
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
