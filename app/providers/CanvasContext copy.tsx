"use client";

import { createContext, RefObject } from "react";

export type TCanvasDatas = {
    pixelData: Record<string, string[]>;
    history: Record<string, string>[];
    backgroundColor: string;
    currentColor: string;
};

export interface ICanvasContext {
    canvas: RefObject<HTMLCanvasElement> | null;
    canvasDatas: TCanvasDatas;
    updateAvailableColors: (colors: string[]) => void;
    canvasWidth: number;
    canvasHeight: number;
    changeBackgroundColor: (color: string) => void;
    pixelSize: number;
    addPixel: (data: Record<string, string>) => void;
    changeColor: (color: string) => void;
    addHistory: (data: Record<string, string>) => void;
    undoPixels: (last: Record<string, string>) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    clearCanvas: () => void;
}

const CanvasContext = createContext<ICanvasContext>({
    canvas: null,
    canvasDatas: {
        pixelData: {},
        history: [],
        backgroundColor: "#ffffff",
        currentColor: "#000000",
    },
    updateAvailableColors: () => {},
    canvasWidth: 400,
    canvasHeight: 400,
    changeBackgroundColor: () => {},
    pixelSize: 1,
    addPixel: () => {},
    changeColor: () => {},
    addHistory: () => {},
    undoPixels: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    clearCanvas: () => {},
});

export default CanvasContext;
