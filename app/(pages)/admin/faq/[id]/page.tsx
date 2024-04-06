import { prisma } from "@/app/db";
import Form from "./Form";

const Page = async ({ params }: { params: { id: string } }) => {
    const faq = await prisma.faq.findFirst({
        where: {
            id: params.id,
        },
    });

    return (
        <section>
            <div className="container">
                <div className="heading">
                    <h1 className="title">Edit FAQ</h1>
                </div>
                {faq && <Form data={faq} />}
            </div>
        </section>
    );
};

export default Page;
