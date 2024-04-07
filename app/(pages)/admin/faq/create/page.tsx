import FaqForm from "../../components/FaqForm/FaqForm";

const Page = () => {
    return (
        <section>
            <div className="container">
                <div className="heading">
                    <h1 className="title">Edit FAQ</h1>
                </div>
                {<FaqForm type="create" />}
            </div>
        </section>
    );
};

export default Page;
