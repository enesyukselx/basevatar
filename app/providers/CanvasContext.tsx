"use client";

import { createContext, RefObject } from "react";

export type TCanvasDatas = {
    pixelData: Record<string, string[]>;
    history: Record<string, string>[];
    backgroundColor: string;
    currentColor: string;
};
export type TCanvasProperties = {
    width: number;
    height: number;
    pixelSize: number;
    availableColors: string[];
};

export interface ICanvasContext {
    canvas: RefObject<HTMLCanvasElement> | null;
    canvasProperties: TCanvasProperties;
    canvasDatas: TCanvasDatas;
    addPixel: (data: Record<string, string>) => void;
    addHistory: (data: Record<string, string>) => void;
    undoPixels: (last: Record<string, string>) => void;
    clearCanvas: () => void;
    updateAvailableColors: (colors: string[]) => void;
    changeBackgroundColor: (color: string) => void;
    changeColor: (color: string) => void;
    zoomIn: () => void;
    zoomOut: () => void;
}

const CanvasContext = createContext<ICanvasContext>({
    canvas: null,
    canvasProperties: {
        width: 400,
        height: 400,
        pixelSize: 1,
        availableColors: [],
    },
    canvasDatas: {
        pixelData: {},
        history: [],
        backgroundColor: "#ffffff",
        currentColor: "#000000",
    },
    addPixel: () => {},
    addHistory: () => {},
    undoPixels: () => {},
    clearCanvas: () => {},
    updateAvailableColors: () => {},
    changeBackgroundColor: () => {},
    changeColor: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
});

export default CanvasContext;
