import fetchFaq from "@/app/actions/public-pages/fetch-faq";
import Faq from "../../../components/Faq/Faq";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";

const Page = async () => {
    const { items, error } = await fetchFaq();

    return (
        <section className="py-8">
            <div className="container">
                <div className="row">
                    <div className="heading">
                        <h1 className="title">FAQ</h1>
                        <p className="subtitle">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt
                            nemo ab praesentium.
                        </p>
                    </div>
                    <Faq data={items ?? {}} />
                </div>
                {error && <ServerErrorMessage />}
            </div>
        </section>
    );
};

export default Page;
