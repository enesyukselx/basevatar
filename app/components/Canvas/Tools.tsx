"use client";

import useCanvas from "@/app/hooks/useCanvas";
import classes from "./Tools.module.scss";
import { LucideImage, LucideMinus, LucidePlus, LucideSave, LucideTrash2, LucideUndo } from "lucide-react";
import { useState } from "react";
import ImageViewer from "./ImageViewer";

const Tools = ({ colors }: { colors: string[] }) => {
    const { canvasDatas, changeColor, undoPixels, zoomIn, zoomOut, clearCanvas, changeBackgroundColor } = useCanvas();
    const [activeColor, setActiveColor] = useState<string>(canvasDatas.currentColor);
    const [imageViewer, setImageViewer] = useState<boolean>(false);

    const undoHandler = () => {
        const last = canvasDatas.history[canvasDatas.history.length - 1];
        if (!last) return;

        undoPixels(last);
    };

    return (
        <div className={classes.tools}>
            <ImageViewer visible={imageViewer} />
            <div className={classes.settings}>
                <button onClick={zoomIn}>
                    <LucidePlus size={24} />
                </button>
                <button onClick={zoomOut}>
                    <LucideMinus size={24} />
                </button>
                <button onClick={undoHandler}>
                    <LucideUndo size={24} />
                </button>
                <button
                    onClick={() => {
                        setImageViewer(!imageViewer);
                    }}
                >
                    <LucideImage size={24} />
                </button>
                <button
                    onClick={() => {
                        confirm("Are you sure you want to clear the canvas?") && clearCanvas();
                    }}
                >
                    <LucideTrash2 size={24} />
                </button>
                <button>
                    <LucideSave size={24} />
                </button>
            </div>

            <div className={classes.colors}>
                <div>Colors</div>
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`${classes.color} ${activeColor === color ? classes.active : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                            changeColor(color);
                            setActiveColor(color);
                        }}
                    />
                ))}
            </div>
            <div className={classes.colors}>
                <div>Background</div>
                {colors.map((color) => (
                    <div
                        key={color}
                        className={`${classes.color}`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                            changeBackgroundColor(color);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tools;
