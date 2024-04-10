"use client";

import { ReactNode } from "react";
import CanvasContext, { ICanvasContext } from "./CanvasContext";

const CanvasContextProvider = ({ children }: { children: ReactNode }) => {
    const values: ICanvasContext = {
        canvas: "canvas",
    };

    return <CanvasContext.Provider value={values}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
