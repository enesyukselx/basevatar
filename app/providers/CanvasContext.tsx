"use client";

import { createContext, RefObject } from "react";

export interface ICanvasContext {
    canvas: RefObject<HTMLCanvasElement> | null;
    canvasWidth: number;
    canvasHeight: number;
    pixelSize: number;
    pixelData: Record<string, string>;
    addPixel: (data: Record<string, string>) => void;
    currentColor: string;
    changeColor: (color: string) => void;
    history: Record<string, string>[];
    addHistory: (data: Record<string, string>) => void;
    undoPixels: (last: Record<string, string>) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    clearCanvas: () => void;
}

const CanvasContext = createContext<ICanvasContext>({
    canvas: null,
    canvasWidth: 400,
    canvasHeight: 400,
    pixelSize: 1,
    pixelData: {},
    addPixel: () => {},
    currentColor: "black",
    changeColor: () => {},
    history: [],
    addHistory: () => {},
    undoPixels: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    clearCanvas: () => {},
});

export default CanvasContext;
