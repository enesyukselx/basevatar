"use client";

import { ReactNode, useEffect, useRef } from "react";
import CanvasContext, { ICanvasContext } from "./CanvasContext";

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
    //
    const canvas = useRef<HTMLCanvasElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (!canvas || !canvas.current) return;
        const ctx = canvas.current.getContext("2d");
        if (!ctx) return;
        context.current = ctx;
    }, [canvas]);

    const values: ICanvasContext = {
        canvas,
        context,
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
