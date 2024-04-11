"use client";

import useCanvas from "@/app/hooks/useCanvas";
import { useEffect } from "react";

import classes from "./Palette.module.scss";

const Palette = () => {
    const { context, setCurrentColor, history, setPixelData } = useCanvas();

    useEffect(() => {
        if (!context || !context.current) return;

        //context.current.fillStyle = "red";
        //context.current.fillRect(0, 0, 25, 5);
    }, [context]);

    const undoHandler = () => {
        const last = history.pop();
        if (!last) return;

        setPixelData((prev) => {
            const next = { ...prev };
            Object.keys(last).forEach((key) => {
                delete next[key];
            });
            return next;
        });
    };

    return (
        <div className={classes.palette}>
            <button onClick={undoHandler}>undo</button>
            <input
                type="color"
                onChange={(e) => {
                    setCurrentColor(e.target.value);
                }}
            />
            <button></button>
        </div>
    );
};

export default Palette;
