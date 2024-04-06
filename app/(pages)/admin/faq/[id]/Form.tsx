"use client";

import formAction from "../../../../actions/admin/faq-update";

interface IFaq {
    id: string;
    content: string;
    title: string;
    order: number;
}

const Form = ({ data }: { data: IFaq }) => {
    return (
        <form className="form" action={formAction.bind(null, data.id)}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input className="text-black" type="text" name="title" id="title" defaultValue={data.title} />
            </div>
            <div className="form-group">
                <label htmlFor="question">content</label>
                <input type="text" name="content" id="content" defaultValue={data.content} />
            </div>
            <div className="form-group">
                <label htmlFor="order">Order</label>
                <input type="number" name="order" id="order" defaultValue={data.order} />
            </div>
            <div className="form-group">
                <button type="submit" className="btn">
                    Save
                </button>
            </div>
        </form>
    );
};

export default Form;
