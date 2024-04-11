"use client";

import useCanvas from "@/app/hooks/useCanvas";
import Palette from "./Palette";
import { useState } from "react";

const Canvas = () => {
    const { canvas, canvasHeight, canvasWidth, addPixel, currentColor, pixelSize, setHistory } = useCanvas();

    const [lastDraw, setLastDraw] = useState<Record<string, string>>({});

    return (
        <div>
            <Palette />
            <canvas
                className="bg-gray-100"
                ref={canvas}
                width={canvasWidth}
                height={canvasHeight}
                onClick={(e) => {
                    const x = Math.floor(e.nativeEvent.offsetX / pixelSize);
                    const y = Math.floor(e.nativeEvent.offsetY / pixelSize);
                    addPixel({ [`${x},${y}`]: currentColor });
                    setLastDraw({
                        ...lastDraw,
                        [`${x},${y}`]: currentColor,
                    });
                }}
                onMouseMove={(e) => {
                    if (!e.buttons) return;
                    const x = Math.floor(e.nativeEvent.offsetX / pixelSize);
                    const y = Math.floor(e.nativeEvent.offsetY / pixelSize);
                    addPixel({ [`${x},${y}`]: currentColor });
                    setLastDraw({
                        ...lastDraw,
                        [`${x},${y}`]: currentColor,
                    });
                }}
                onMouseDown={() => {
                    setHistory((prev) => {
                        const last = { ...lastDraw };
                        return [...prev, last];
                    });

                    setLastDraw((prev) => {
                        Object.keys(prev).forEach((key) => {
                            delete prev[key];
                        });
                        return prev;
                    });
                }}
            />
        </div>
    );
};

export default Canvas;
