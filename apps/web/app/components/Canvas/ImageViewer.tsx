/* eslint-disable @next/next/no-img-element */
"use client";

import { LucideGrip } from "lucide-react";
import classes from "./ImageViewer.module.scss";
import { useRef, useState } from "react";

const ImageViewer = ({ visible }: { visible: boolean }) => {
    const [imageURL, setImageURL] = useState<string>("");
    const [opacity, setOpacity] = useState<number>(50);
    const [width, setWidth] = useState<number>(300);
    const [height, setHeight] = useState<number>(300);
    const imageViewerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [cords, setCords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    //Resize Events
    const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = width;
        const startHeight = height;
        const onMouseMove = (e: MouseEvent) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            if (newWidth < 200) return;
            if (newHeight < 200) return;
            setWidth(newWidth);
            setHeight(newHeight);
        };
        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const handleResizeTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        const startX = touch.clientX;
        const startY = touch.clientY;
        const startWidth = width;
        const startHeight = height;
        const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const newWidth = startWidth + (touch.clientX - startX);
            const newHeight = startHeight + (touch.clientY - startY);
            if (newWidth < 200) return;
            if (newHeight < 200) return;
            setWidth(newWidth);
            setHeight(newHeight);
        };
        const onTouchEnd = () => {
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchend", onTouchEnd);
    };

    //Drag Events
    const handleDragMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const imageViewer = imageViewerRef.current;
        if (!imageViewer) return;
        const startLeft = imageViewer.offsetLeft;
        const startTop = imageViewer.offsetTop;
        const onMouseMove = (e: MouseEvent) => {
            const newLeft = startLeft + (e.clientX - startX);
            const newTop = startTop + (e.clientY - startY);
            if (newLeft < 0) return;
            if (newTop < 0) return;
            imageViewer.style.left = `${newLeft}px`;
            imageViewer.style.top = `${newTop}px`;
        };
        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    const handleDragTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
        const touch = e.touches[0];
        setIsDragging(true);
        setCords({ x: touch.clientX, y: touch.clientY });
    };

    const handleDragTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const imageViewer = imageViewerRef.current;
        if (!imageViewer) return;
        const newLeft = imageViewer.offsetLeft + (touch.clientX - cords.x);
        const newTop = imageViewer.offsetTop + (touch.clientY - cords.y);
        if (newLeft < 0) return;
        if (newTop < 0) return;
        imageViewer.style.left = `${newLeft}px`;
        imageViewer.style.top = `${newTop}px`;
        setCords({ x: touch.clientX, y: touch.clientY });
    };

    return (
        <div
            className={classes["image-viewer"]}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                display: visible ? "block" : "none",
                touchAction: "none", // Prevent default touch actions (scrolling, zooming)
            }}
            ref={imageViewerRef}
        >
            <div className={classes.input}>
                <LucideGrip
                    size={32}
                    color="black"
                    onMouseDown={handleDragMouseDown}
                    onTouchStart={handleDragTouchStart}
                    onTouchMove={handleDragTouchMove}
                    onTouchEnd={() => setIsDragging(false)}
                />
                <input
                    type="text"
                    placeholder="URL: https://google.com/image.png"
                    onChange={(e) => {
                        const value = e.target.value;
                        setImageURL(value);
                    }}
                />
            </div>
            <div className={`${classes.input} ${classes.opacity}`}>
                <label htmlFor="opacity">Opacity</label>
                <input
                    id="opacity"
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    defaultValue={opacity}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setOpacity(value);
                    }}
                />
            </div>
            <div
                style={{
                    pointerEvents: "none",
                }}
            >
                <img
                    src={imageURL}
                    alt="Image"
                    style={{
                        height: "100%",
                        opacity: opacity / 100,
                    }}
                />
            </div>
            <div
                className="absolute -bottom-2 -right-2 bg-white rounded-full w-4 h-4 border border-black shadow-lg cursor-nwse-resize pointer-events-auto"
                onMouseDown={handleResizeMouseDown}
                onTouchStart={handleResizeTouchStart}
            ></div>
        </div>
    );
};

export default ImageViewer;
