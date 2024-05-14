"use client";

import { useState } from "react";

import classes from "./VoteForm.module.scss";
import Link from "next/link";
import ColorPicker from "./ColorPicker";
import { useFormState } from "react-dom";
import { TFormState } from "@/app/types";
import voteAction from "@/app/actions/admin/vote-action";
import SubmitButton from "../SubmitButton";

const VoteForm = ({ day }: { day: string }) => {
    //
    const [voteType, setVoteType] = useState<"color" | "theme">("theme");
    const [state, action] = useFormState((prevState: TFormState, data: FormData) => voteAction(prevState, data), {
        message: "",
        errors: {},
    });

    return (
        <>
            <div className={classes["type-actions"]}>
                <button className={voteType === "theme" ? classes.active : ""} onClick={() => setVoteType("theme")}>
                    Theme
                </button>
                <button className={voteType === "color" ? classes.active : ""} onClick={() => setVoteType("color")}>
                    Color
                </button>
            </div>
            <form action={action} className={classes.form}>
                <input type="hidden" name="type" value={voteType} />
                {voteType === "color" && (
                    <div className={classes["form-group"]}>
                        <ColorPicker />
                    </div>
                )}
                {voteType === "theme" && (
                    <div className={classes["form-group"]}>
                        <label htmlFor="value">Value</label>
                        <input
                            type="text"
                            name="value"
                            id="value"
                            placeholder="
                        Please enter a theme value
                        "
                            required
                        />
                    </div>
                )}
                {state.errors.value && <div className="text-red-200 font-semibold">{state.errors.value[0]}</div>}
                <div className={classes["form-group"]}>
                    <label htmlFor="count">Day</label>
                    <input type="number" name="day" id="day" min={1} max={999} required defaultValue={day} />
                    {state.errors.day && <div className="text-red-200 font-semibold">{state.errors.day[0]}</div>}
                </div>

                <div className={classes["form-group"]}>
                    <Link className="btn px-4 py-2 mr-4 font-semibold" href={`/admin/votes?day=${day}`}>
                        Cancel
                    </Link>
                    <SubmitButton className="btn px-4 py-2 mr-4 font-semibold">Create Vote</SubmitButton>
                </div>
            </form>
        </>
    );
};

export default VoteForm;
