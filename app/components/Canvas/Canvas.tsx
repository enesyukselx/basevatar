"use client";

import useCanvas from "@/app/hooks/useCanvas";

const Canvas = () => {
    const { canvas } = useCanvas();

    console.log(canvas);

    return <canvas></canvas>;
};

export default Canvas;
