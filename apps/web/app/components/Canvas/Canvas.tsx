"use client";

import useCanvas from "@/app/hooks/useCanvas";
import Tools from "./Tools";
import { useEffect, useState } from "react";
import useCountDown from "@/app/hooks/useCountDown";

const Canvas = ({ theme, colors, finishTime }: { theme: string; colors: string; finishTime: number }) => {
    //
    const { canvas, canvasDatas, canvasProperties, addPixel, addHistory, updateAvailableColors, updateLocalStorage } =
        useCanvas();

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [lastDraw, setLastDraw] = useState<Record<string, string>>({});

    useEffect(() => {
        updateAvailableColors(colors.split(","));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isDrawing) updateLocalStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDrawing]);

    const handleTouchDraw = (e: React.TouchEvent<HTMLCanvasElement>) => {
        const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
        const x = Math.floor((e.touches[0].clientX - rect.left) / canvasProperties.pixelSize);
        const y = Math.floor((e.touches[0].clientY - rect.top) / canvasProperties.pixelSize);
        if (lastDraw.x !== x.toString() || lastDraw.y !== y.toString()) {
            addPixel({ [`${x},${y}`]: canvasDatas.currentColor });
            setLastDraw({
                ...lastDraw,
                [`${x},${y}`]: canvasDatas.currentColor,
            });
        }
    };

    const handleTouchEnd = () => {
        setIsDrawing(false);
        addHistory(lastDraw);
        setLastDraw((prev) => {
            Object.keys(prev).forEach((key) => {
                delete prev[key];
            });
            return prev;
        });
    };

    const handleMouseDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
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

    const handleMouseLeave = () => {
        setIsDrawing(false);
        addHistory(lastDraw);
        setLastDraw((prev) => {
            Object.keys(prev).forEach((key) => {
                delete prev[key];
            });
            return prev;
        });
    };

    const countdown = useCountDown({ deadline: new Date(finishTime) });

    return (
        <>
            <div className="mt-2">
                Today&apos;s theme: <span className="font-semibold">{theme}</span>
            </div>
            <Tools colors={colors.split(",")} />
            <div className="flex gap-2 pb-4 text-center select-none">
                <div className="font-bold">New Day Starts In</div>
                <div className="flex gap-1 justify-center">
                    {countdown.hours.toString().padStart(2, "0")}:{countdown.minutes.toString().padStart(2, "0")}:
                    {countdown.seconds.toString().padStart(2, "0")}
                </div>
            </div>
            <canvas
                ref={canvas}
                width={canvasProperties.width}
                height={canvasProperties.height}
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => (isDrawing ? handleMouseLeave() : null)}
                onMouseLeave={() => (isDrawing ? handleMouseLeave() : null)}
                onMouseMove={(e) => (isDrawing ? handleMouseDraw(e) : null)}
                onTouchStart={() => setIsDrawing(true)}
                onTouchMove={(e) => (isDrawing ? handleTouchDraw(e) : null)}
                onTouchEnd={() => (isDrawing ? handleTouchEnd() : null)}
                onTouchCancel={() => (isDrawing ? handleTouchEnd() : null)}
                style={{
                    transform: `scale(${canvasProperties.zoom})`,
                    transformOrigin: "top left",
                    zIndex: -10,
                    borderBottom: "20px solid #000",
                    touchAction: "none",
                }}
            />
        </>
    );
};

export default Canvas;
