import Faq from "../../../components/Faq/Faq";
import { prisma } from "@/app/lib/db";

const fetchData = async () => {
    "use server";
    try {
        const items = await prisma.faq.findMany({
            orderBy: {
                order: "asc",
            },
            where: {
                isDeleted: false,
            },
        });

        return {
            items,
            error: false,
        };
    } catch (e: unknown) {
        return {
            items: [],
            error: true,
        };
    }
};

const Page = async () => {
    const { items, error } = await fetchData();

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
                {error && <div className="error-message">Internal Server Error. Please try again later.</div>}
            </div>
        </section>
    );
};

export default Page;
