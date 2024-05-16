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

    const MouseDownHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const imageViewer = imageViewerRef.current;
        if (!imageViewer) return;
        const startLeft = imageViewer.offsetLeft;
        const startTop = imageViewer.offsetTop;
        const onMouseMove = (e: MouseEvent) => {
            const newLeft = startLeft + (e.clientX - startX);
            const newTop = startTop + (e.clientY - startY);
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

    return (
        <div
            className={classes["image-viewer"]}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                display: visible ? "block" : "none",
            }}
            ref={imageViewerRef}
        >
            <div className={classes.input}>
                <LucideGrip
                    size={32}
                    color="black"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        MouseDownHandler(e);
                    }}
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                onMouseDown={(e) => {
                    e.preventDefault();
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startWidth = width;
                    const startHeight = height;
                    const onMouseMove = (e: MouseEvent) => {
                        const newWidth = startWidth + (e.clientX - startX);
                        const newHeight = startHeight + (e.clientY - startY);
                        setWidth(newWidth);
                        setHeight(newHeight);
                    };
                    const onMouseUp = () => {
                        window.removeEventListener("mousemove", onMouseMove);
                        window.removeEventListener("mouseup", onMouseUp);
                    };
                    window.addEventListener("mousemove", onMouseMove);
                    window.addEventListener("mouseup", onMouseUp);
                }}
            ></div>
        </div>
    );
};

export default ImageViewer;
