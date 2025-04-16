"use client";

import { LucideCircleHelp } from "lucide-react";
import classes from "./ConfirmationModal.module.scss";

const ConfirmationModal = ({
    children,
    icon,
    handleConfirm,
    handleCancel,
}: {
    children: React.ReactNode;
    icon?: React.ReactNode;
    handleConfirm: () => void;
    handleCancel: () => void;
}) => {
    return (
        <>
            <div className={classes["backdrop"]} onClick={handleCancel}></div>
            <div className={classes["modal"]}>
                <div className={classes["icon"]}>
                    {!icon && <LucideCircleHelp size={90} fill="true" />}
                    {icon && icon}
                </div>
                <div className={classes["message"]}>{children}</div>

                <div className={classes["buttons"]}>
                    <button className={classes["confirm"]} onClick={handleConfirm}>
                        Confirm
                    </button>
                    <button className={classes["cancel"]} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModal;
