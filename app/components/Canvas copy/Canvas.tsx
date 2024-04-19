"use client";

import useCanvas from "@/app/hooks/useCanvas";
import Tools from "./Tools";
import { useEffect, useState } from "react";

const Canvas = ({ theme, colors }: { theme: string; colors: string }) => {
    //
    const { canvas, canvasHeight, canvasWidth, addPixel, pixelSize, addHistory, canvasDatas, updateAvailableColors } =
        useCanvas();

    const [lastDraw, setLastDraw] = useState<Record<string, string>>({});

    useEffect(() => {
        updateAvailableColors(colors.split(","));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
        //
        if (!e.buttons) return;
        const x = Math.floor(e.nativeEvent.offsetX / pixelSize);
        const y = Math.floor(e.nativeEvent.offsetY / pixelSize);
        addPixel({ [`${x},${y}`]: canvasDatas.currentColor });
        setLastDraw({
            ...lastDraw,
            [`${x},${y}`]: canvasDatas.currentColor,
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
        <>
            <div className="mt-2">
                Today&apos;s theme: <span className="font-semibold">{theme}</span>
            </div>
            <Tools colors={colors.split(",")} />
            <canvas
                className="bg-gray-100"
                ref={canvas}
                width={canvasWidth}
                height={canvasHeight}
                onMouseMove={(e) => mouseMoveHandler(e)}
                onMouseDown={(e) => mouseMoveHandler(e)}
                onMouseUp={() => mouseUpHandler()}
            />
        </>
    );
};

export default Canvas;
