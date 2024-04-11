"use client";

import useCanvas from "@/app/hooks/useCanvas";

const Canvas = () => {
    const { canvas } = useCanvas();

    return <canvas></canvas>;
};

export default Canvas;
