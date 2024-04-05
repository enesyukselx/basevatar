"use client";

import classes from "./Faq.module.scss";
import { LucideChevronDown } from "lucide-react";

interface IFaq {
    title: string;
    content: string;
}

const Faq = ({ data }: { data: IFaq[] }) => {
    return (
        <div className={classes.accordion}>
            {data.map((faq, index) => (
                <div key={index} className={classes["accordion-item"]}>
                    <button
                        className={classes["accordion-title"]}
                        onClick={(e) => (e.currentTarget.parentNode as HTMLElement)?.classList.toggle(classes.active)}
                    >
                        {faq.title}
                        <LucideChevronDown size={20} />
                    </button>
                    <div
                        className={classes["accordion-content"]}
                        dangerouslySetInnerHTML={{ __html: faq.content }}
                    ></div>
                </div>
            ))}
        </div>
    );
};

export default Faq;
