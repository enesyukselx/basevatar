"use client";

import { createContext, RefObject } from "react";

export interface ICanvasContext {
    canvas: RefObject<HTMLCanvasElement> | null;
    context: RefObject<CanvasRenderingContext2D | null> | null;
}

const CanvasContext = createContext<ICanvasContext>({
    canvas: null,
    context: null,
});

export default CanvasContext;
