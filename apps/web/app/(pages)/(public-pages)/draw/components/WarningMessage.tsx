"use client";

import { useModal } from "connectkit";
import { useEffect } from "react";

const WarningMessage = () => {
    const { setOpen } = useModal();

    useEffect(() => {
        setOpen(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg-red-200 px-4 mt-4 rounded py-2 font-semibold text-red-900">
            You need to{" "}
            <button
                className="bg-red-700 text-sm hover:bg-red-900 text-white px-2 rounded"
                onClick={() => setOpen(true)}
            >
                connect
            </button>{" "}
            your wallet and{" "}
            <button
                className="bg-red-700 text-sm hover:bg-red-900 text-white px-2 rounded"
                onClick={() => setOpen(true)}
            >
                sign in
            </button>{" "}
            to draw.
        </div>
    );
};

export default WarningMessage;
