import Faq from "../../components/Faq/Faq";

const FAQ_CONTENT = [
    {
        title: "What is Lorem Ipsum?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt nemo ab praesentium.",
    },
    {
        title: "Why do we use it?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, sit. Maiores cumque sint placeat recusandae odit! Harum consequuntur nesciunt exercitationem corrupti distinctio, cumque animi molestias, quis minima asperiores possimus? Officia!",
    },
    {
        title: "Where does it come from?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt nemo ab praesentium.",
    },
    {
        title: "Where can I get some?",
        content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, exercitationem deserunt nemo ab praesentium.",
    },
];

const Page = () => {
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

                    <Faq data={FAQ_CONTENT} />
                </div>
            </div>
        </section>
    );
};

export default Page;
