"use client";

import { createContext, RefObject } from "react";

export interface ICanvasContext {
    canvas: RefObject<HTMLCanvasElement> | null;
    context: RefObject<CanvasRenderingContext2D | null> | null;
    canvasWidth: number;
    canvasHeight: number;
    pixelSize: number;
    pixelData: Record<string, string>;
    setPixelData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    addPixel: (data: Record<string, string>) => void;
    currentColor: string;
    setCurrentColor: (color: string) => void;
    history: Record<string, string>[];
    setHistory: React.Dispatch<React.SetStateAction<Record<string, string>[]>>;
}

const CanvasContext = createContext<ICanvasContext>({
    canvas: null,
    context: null,
    canvasWidth: 400,
    canvasHeight: 400,
    pixelSize: 1,
    pixelData: {},
    setPixelData: () => {},
    addPixel: () => {},
    currentColor: "black",
    setCurrentColor: () => {},
    history: [],
    setHistory: () => {},
});

export default CanvasContext;
