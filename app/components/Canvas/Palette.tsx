"use client";

import useCanvas from "@/app/hooks/useCanvas";
import { useEffect } from "react";

const Palette = () => {
    const { context } = useCanvas();

    useEffect(() => {
        if (!context || !context.current) return;

        context.current.fillStyle = "red";
        context.current.fillRect(0, 0, 100, 100);

        //
    }, [context]);

    return <div>palet</div>;
};

export default Palette;
