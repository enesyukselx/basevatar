"use client";

import useCanvas from "@/app/hooks/useCanvas";
import Tools from "./Tools";
import { useEffect, useState, useRef } from "react";

const Canvas = ({ theme, colors }: { theme: string; colors: string }) => {
    const { canvas, canvasDatas, canvasProperties, addPixel, addHistory, updateAvailableColors, updateLocalStorage } =
        useCanvas();

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [lastDraw, setLastDraw] = useState<Record<string, string>>({});
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        updateAvailableColors(colors.split(","));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isDrawing) updateLocalStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDrawing]);

    // getTouchPos fonksiyonu için tipler
    const getTouchPos = (
        canvasDom: HTMLCanvasElement | null,
        touchEvent: React.TouchEvent<HTMLCanvasElement>
    ): { x: number; y: number } => {
        if (!canvasDom) {
            return { x: 0, y: 0 };
        }
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top,
        };
    };

    // handleDraw fonksiyonu için tipler
    const handleDraw = (x: number, y: number): void => {
        const pixelX = Math.floor(x / canvasProperties.pixelSize);
        const pixelY = Math.floor(y / canvasProperties.pixelSize);
        if (lastDraw.x !== pixelX.toString() || lastDraw.y !== pixelY.toString()) {
            addPixel({ [`${pixelX},${pixelY}`]: canvasDatas.currentColor });
            setLastDraw({
                ...lastDraw,
                [`${pixelX},${pixelY}`]: canvasDatas.currentColor,
            });
        }
    };

    const handleMouseDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;
        handleDraw(x, y);
    };

    const handleTouchDraw = (e: React.TouchEvent<HTMLCanvasElement>) => {
        const pos = getTouchPos(canvasRef.current, e);
        handleDraw(pos.x, pos.y);
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
                ref={canvas}
                width={canvasProperties.width}
                height={canvasProperties.height}
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => (isDrawing ? handleLeave() : null)}
                onMouseLeave={() => (isDrawing ? handleLeave() : null)}
                onMouseMove={(e) => (isDrawing ? handleMouseDraw(e) : null)}
                onTouchStart={() => setIsDrawing(true)}
                onTouchEnd={() => (isDrawing ? handleLeave() : null)}
                onTouchMove={(e) => (isDrawing ? handleTouchDraw(e) : null)}
                style={{
                    transform: `scale(${canvasProperties.zoom})`,
                    transformOrigin: "top left",
                    zIndex: -10,
                    borderBottom: "20px solid #000",
                    touchAction: "none", // Prevent default touch actions (scrolling, zooming)
                }}
            />
        </>
    );
};

export default Canvas;
