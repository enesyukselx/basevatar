import { prisma } from "@/app/db";
import Link from "next/link";

const Faq = async () => {
    const faq = await prisma.faq.findMany({
        orderBy: {
            order: "asc",
        },
    });

    return (
        <section className="admin-faq">
            <div className="container">
                <div className="heading">
                    <h1 className="title">FAQ Settings</h1>
                    <p className="subtitle">
                        You can manage the FAQ section here. You can add, edit, and delete questions and answers.
                    </p>
                </div>
                <ul className="mt-4">
                    {faq.map((item) => (
                        <li
                            key={item.id}
                            className="border-2 border-white flex justify-between items-center px-4 py-4 mb-2"
                        >
                            <div className="question">
                                <h3 className="font-semibold">{item.title}</h3>
                            </div>
                            <div className="actions">
                                <Link
                                    className="hover:bg-white bg-black border-2 border-white text-white hover:text-black px-2 py-1 font-semibold"
                                    href={`faq/${item.id}`}
                                >
                                    Edit
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Faq;
