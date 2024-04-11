"use client";

import { createContext } from "react";

export interface ICanvasContext {
    canvas: HTMLCanvasElement | null;
}

const CanvasContext = createContext<ICanvasContext>({
    canvas: null,
});

export default CanvasContext;
