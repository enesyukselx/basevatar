"use client";

import { useState } from "react";
import classes from "./ColorPicker.module.scss";
import { LucidePlus, LucideX } from "lucide-react";

const ColorPicker = () => {
    //
    const [colors, setColors] = useState<string[]>(["#ff0000", "#00ff00", "#0000ff"]);
    const [selectedColor, setSelectedColor] = useState<string>("#f98212");

    return (
        <div className={classes["color-picker"]}>
            <div className={classes.colors}>
                {colors.map((color, i) => (
                    <div className={classes.color} key={i}>
                        <div style={{ backgroundColor: color }}></div>
                        <div>{color}</div>
                        <div>
                            <button
                                className="bg-red-300 rounded px-1 py-1"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setColors((prev) => prev.filter((_, index) => index !== i));
                                }}
                            >
                                <LucideX size={20} />
                            </button>
                        </div>
                    </div>
                ))}
                <div className={classes.picker}>
                    <input type="color" defaultValue="#f98212" onChange={(e) => setSelectedColor(e.target.value)} />
                    <div
                        className="inline-block h-8 w-8"
                        style={{
                            backgroundColor: selectedColor,
                        }}
                    ></div>
                    <div className="text-black">{selectedColor}</div>
                    <button
                        className="bg-black text-white inline-flex h-8 w-16 justify-center items-center"
                        onClick={(e) => {
                            e.preventDefault();
                            setColors((prev) => [...prev, selectedColor]);
                        }}
                    >
                        <LucidePlus size={20} />
                    </button>
                </div>
                <input type="hidden" name="value" value={colors.join(",")} />
            </div>
        </div>
    );
};

export default ColorPicker;
