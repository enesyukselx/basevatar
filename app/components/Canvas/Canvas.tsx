"use client";

import useCanvas from "@/app/hooks/useCanvas";
import { useEffect } from "react";
import Palette from "./Palette";

const Canvas = () => {
    const { canvas } = useCanvas();

    return (
        <div>
            <Palette />
            <canvas ref={canvas} width="800" height="600" />
        </div>
    );
};

export default Canvas;
