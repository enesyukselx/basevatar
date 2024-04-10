"use client";

import { createContext } from "react";

export interface ICanvasContext {
    canvas: string;
}

const CanvasContext = createContext<ICanvasContext>({
    canvas: "canvas",
});

export default CanvasContext;
