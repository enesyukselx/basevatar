import { prisma } from "@/app/db";
import Link from "next/link";

const Faq = async () => {
    const faq = await prisma.faq.findMany({
        orderBy: {
            order: "asc",
        },
    });

    return (
        <section className="section-faq-admin">
            <div className="container">
                <div className="heading">
                    <h1 className="title">FAQ Settings</h1>
                    <p className="subtitle">
                        You can manage the FAQ section here. You can add, edit, and delete questions and answers.
                    </p>
                    <Link
                        href="/admin/faq/create"
                        className="border-2 border-white font-semibold inline-block px-3 py-1 mt-2 hover:bg-white hover:text-black"
                    >
                        Create
                    </Link>
                </div>
                <ul>
                    {faq.map((item) => (
                        <li key={item.id}>
                            <div className="question">
                                <h3 className="font-semibold">{item.title}</h3>
                            </div>
                            <div className="actions">
                                <Link href={`faq/${item.id}`}>Edit</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Faq;
