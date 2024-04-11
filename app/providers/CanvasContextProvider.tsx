"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import CanvasContext, { ICanvasContext } from "./CanvasContext";

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
    //
    const canvas = useRef<HTMLCanvasElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const canvasWidth = 300;
    const canvasHeight = 300;
    const pixelSize = 5;

    const [pixelData, setPixelData] = useState<Record<string, string>>({});
    const [currentColor, setCurrentColor] = useState<string>("black");
    const [history, setHistory] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        if (!canvas || !canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;
        context.current = ctx;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.125)";

        for (let x = 0; x < 1000; x += pixelSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight);
            ctx.stroke();
        }

        for (let y = 0; y < 1000; y += pixelSize) {
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
    }, [canvas, pixelData]);

    const values: ICanvasContext = {
        canvas,
        context,
        canvasWidth,
        canvasHeight,
        pixelSize,
        pixelData,
        setPixelData,
        addPixel: (data) => setPixelData((prev) => ({ ...prev, ...data })),
        currentColor,
        setCurrentColor,
        history,
        setHistory,
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
