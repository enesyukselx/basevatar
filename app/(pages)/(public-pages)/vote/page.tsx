import { prisma } from "@/app/lib/db";

import Votes from "./components/Votes";
import { getSession } from "@/app/utils/sessionHelpers";

const Page = async () => {
    const session = await getSession();

    const settings = await prisma.settings.findFirst({
        where: {
            key: "day",
        },
    });

    const colors = await prisma.votes.findMany({
        where: {
            type: "color",
            day: Number(settings?.value) + 1 ?? 1,
        },
    });

    const themes = await prisma.votes.findMany({
        where: {
            type: "theme",
            day: Number(settings?.value) + 1 ?? 1,
        },
    });

    return (
        <section className="section-vote">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Vote for Day #{Number(settings?.value) + 1 || 1} Themes</h1>
                    <p className="subtitle">
                        Vote for the colors and themes you want to see in the next day&apos;s theme.
                    </p>
                    <p className="subtitle">Each vote costs {process.env.NEXT_PUBLIC_VOTE_PRICE} ETH.</p>
                </div>
                <div className="row gx-8">
                    <div className="sm:col-6 lg:col-4">
                        <Votes
                            type="color"
                            data={colors}
                            walletAddress={session?.address || ""}
                            ethPrice={process.env.NEXT_PUBLIC_VOTE_PRICE ?? "0.00020"}
                        />
                    </div>
                    <div className="sm:col-6 lg:col-4">
                        <Votes
                            type="theme"
                            data={themes}
                            walletAddress={session?.address || ""}
                            ethPrice={process.env.NEXT_PUBLIC_VOTE_PRICE ?? "0.00020"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
