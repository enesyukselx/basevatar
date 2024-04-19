"use client";

import useCanvas from "@/app/hooks/useCanvas";
import Tools from "./Tools";
import { useEffect, useState } from "react";

const Canvas = ({ theme, colors }: { theme: string; colors: string }) => {
    //
    const { canvas, canvasDatas, canvasProperties, addPixel, addHistory, updateAvailableColors } = useCanvas();
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastDraw, setLastDraw] = useState<Record<string, string>>({});

    useEffect(() => {
        updateAvailableColors(colors.split(","));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const x = Math.floor(e.nativeEvent.offsetX / canvasProperties.pixelSize);
        const y = Math.floor(e.nativeEvent.offsetY / canvasProperties.pixelSize);
        if (lastDraw.x !== x.toString() || lastDraw.y !== y.toString()) {
            addPixel({ [`${x},${y}`]: canvasDatas.currentColor });
            setLastDraw({
                ...lastDraw,
                [`${x},${y}`]: canvasDatas.currentColor,
            });
        }
    };

    const handleLeave = () => {
        setIsDrawing(false);
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
                width={canvasProperties.width}
                height={canvasProperties.height}
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => (isDrawing ? handleLeave() : null)}
                onMouseLeave={() => (isDrawing ? handleLeave() : null)}
                onMouseMove={(e) => (isDrawing ? handleDraw(e) : null)}
            />
        </>
    );
};

export default Canvas;
