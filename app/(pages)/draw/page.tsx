import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

const Page = async () => {
    const session = await getServerSession(authOptions);

    return (
        <section className="section-draw py-8">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Draw</h1>
                    <p className="subtitle">Draw your own design</p>
                    {session == null && (
                        <div className="bg-red-200 px-4 mt-4 rounded py-2 font-semibold text-red-900">
                            You need to connect your wallet to draw
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;
