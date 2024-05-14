"use client";

import { useRouter } from "next/navigation";

import classes from "./FaqForm.module.scss";
import { faqDelete } from "@/app/actions/admin/faq-delete";
import { useFormState } from "react-dom";
import { IFaq, TFormState } from "@/app/types";
import faqAction from "@/app/actions/admin/faq-action";
import SubmitButton from "../SubmitButton";

type FaqFormProps = { type: "create"; data?: never } | { type: "update"; data: IFaq };

const FaqForm = ({ type, data }: FaqFormProps) => {
    //
    const [state, action] = useFormState((prevState: TFormState, data: FormData) => faqAction(prevState, data), {
        message: "",
        errors: {},
    });

    const router = useRouter();

    return (
        <form className={classes.form} action={action}>
            <div className={classes["form-group"]}>
                {type === "update" && <input type="hidden" name="id" value={data.id} />}
                <label htmlFor="title">Title</label>
                <input
                    className="text-black"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="FAQ Title"
                    defaultValue={type === "update" ? data?.title : ""}
                />
                {state.errors.title && <div className="text-red-200 font-semibold">{state.errors.title[0]}</div>}
            </div>
            <div className={classes["form-group"]}>
                <label htmlFor="content">Content</label>
                <textarea
                    name="content"
                    id="content"
                    rows={5}
                    defaultValue={type === "update" ? data?.content : ""}
                    placeholder="FAQ Content"
                />
                {state.errors.content && <div className="text-red-200 font-semibold">{state.errors.content[0]}</div>}
            </div>
            <div className={classes["form-group"]}>
                <label htmlFor="order">Order</label>
                <input
                    type="number"
                    name="order"
                    id="order"
                    defaultValue={type === "update" ? data?.order : "1"}
                    placeholder="FAQ Order"
                />
                {state.errors.order && <div className="text-red-200 font-semibold">{state.errors.order[0]}</div>}
            </div>
            <div className={classes["form-group"]}>
                <button
                    className="btn"
                    onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                >
                    Cancel
                </button>
                <SubmitButton className="btn">{type === "create" ? "Create FAQ" : "Save FAQ"}</SubmitButton>
                {type === "update" && (
                    <button
                        className={`btn ${classes["delete-btn"]}`}
                        onClick={() => {
                            if (confirm("Are you sure you want to delete this FAQ?")) {
                                faqDelete(data.id);
                            }
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </form>
    );
};

export default FaqForm;
