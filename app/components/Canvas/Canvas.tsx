"use client";

import useCanvas from "@/app/hooks/useCanvas";
import Palette from "./Tools";
import { useState } from "react";

const Canvas = () => {
    const { canvas, canvasHeight, canvasWidth, addPixel, currentColor, pixelSize, addHistory } = useCanvas();

    const [lastDraw, setLastDraw] = useState<Record<string, string>>({});

    const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!e.buttons) return;
        const x = Math.floor(e.nativeEvent.offsetX / pixelSize);
        const y = Math.floor(e.nativeEvent.offsetY / pixelSize);
        addPixel({ [`${x},${y}`]: currentColor });
        setLastDraw({
            ...lastDraw,
            [`${x},${y}`]: currentColor,
        });
    };

    const mouseUpHandler = () => {
        //
        addHistory(lastDraw);
        setLastDraw((prev) => {
            Object.keys(prev).forEach((key) => {
                delete prev[key];
            });
            return prev;
        });
    };

    return (
        <div>
            <Palette />
            <canvas
                className="bg-gray-100"
                ref={canvas}
                width={canvasWidth}
                height={canvasHeight}
                onMouseMove={(e) => mouseMoveHandler(e)}
                onMouseDown={(e) => mouseMoveHandler(e)}
                onMouseUp={() => mouseUpHandler()}
            />
        </div>
    );
};

export default Canvas;
