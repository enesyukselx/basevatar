import { redirect } from "next/navigation";

import { prisma } from "@/app/lib/db";
import FaqForm from "../../components/FaqForm/FaqForm";

const Page = async ({ params }: { params: { id: string } }) => {
    try {
        const faq = await prisma.faq.findFirst({
            where: {
                id: params.id,
            },
        });

        return (
            <section>
                <div className="heading">
                    <h1 className="title">Edit FAQ</h1>
                </div>
                {faq && <FaqForm type="update" data={faq} />}
            </section>
        );
    } catch (e) {
        redirect("/admin/faq");
    }
};

export default Page;
