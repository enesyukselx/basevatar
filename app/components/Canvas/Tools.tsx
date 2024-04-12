"use client";

import useCanvas from "@/app/hooks/useCanvas";
import classes from "./Tools.module.scss";
import { LucideImage, LucideMinus, LucidePlus, LucideSave, LucideTrash2, LucideUndo } from "lucide-react";
import { useState } from "react";

const COLORS = ["black", "white", "red", "green", "blue", "#d5b549"];

const Palette = () => {
    const { changeColor, history, undoPixels, zoomIn, zoomOut, clearCanvas } = useCanvas();

    const [activeColor, setActiveColor] = useState<string>(COLORS[0]);

    const undoHandler = () => {
        const last = history.pop();
        if (!last) return;

        undoPixels(last);
    };

    return (
        <div className={classes.tools}>
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
                <button>
                    <LucideSave size={24} />
                </button>
                <button>
                    <LucideImage size={24} />
                </button>
                <button onClick={clearCanvas}>
                    <LucideTrash2 size={24} />
                </button>
            </div>
            <div className={classes.colors}>
                {COLORS.map((color) => (
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
        </div>
    );
};

export default Palette;
