import FaqForm from "../../components/FaqForm/FaqForm";

const Page = () => {
    return (
        <section>
            <div className="heading">
                <h1 className="title">Create FAQ</h1>
            </div>
            {<FaqForm type="create" />}
        </section>
    );
};

export default Page;
