"use client";

import { useRouter } from "next/navigation";
import { useOptimistic } from "react";

import faqAction from "@/app/actions/admin/faq-action";
import classes from "./FaqForm.module.scss";
import { faqDelete } from "@/app/actions/admin/faq-delete";

interface IFaq {
    id: string;
    content: string;
    title: string;
    order: number;
}

type FaqFormProps = { type: "create"; data?: never } | { type: "update"; data: IFaq };

const FaqForm = ({ type, data }: FaqFormProps) => {
    //
    const router = useRouter();

    return (
        <form className={classes.form} action={faqAction.bind(null, data?.id || "")}>
            <div className={classes["form-group"]}>
                <label htmlFor="title">Title</label>
                <input
                    className="text-black"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="FAQ Title"
                    defaultValue={type === "update" ? data?.title : ""}
                />
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
            </div>
            <div className={classes["form-group"]}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        router.back();
                    }}
                >
                    Cancel
                </button>
                <button type="submit" className="btn">
                    {type === "create" ? "Create FAQ" : "Save FAQ"}
                </button>
                {type === "update" && (
                    <button
                        className={classes["delete-btn"]}
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
