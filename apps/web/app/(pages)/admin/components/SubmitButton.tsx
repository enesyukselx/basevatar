"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/app/utils/cn";

const SubmitButton = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" className={cn("", className)} disabled={pending}>
            {children}
        </button>
    );
};

export default SubmitButton;
