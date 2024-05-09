import { prisma } from "@/app/lib/db";
import Votes from "./components/Votes";
import { getSession } from "@/app/utils/sessionHelpers";

const fetchData = async () => {
    "use server";
    try {
        const settings = await prisma.settings.findFirst({
            where: {
                key: "day",
            },
        });

        const colors = await prisma.votes.findMany({
            where: {
                type: "color",
                day: Number(settings?.value) + 1 ?? 1,
                isDeleted: false,
            },
        });

        const themes = await prisma.votes.findMany({
            where: {
                type: "theme",
                day: Number(settings?.value) + 1 ?? 1,
                isDeleted: false,
            },
        });

        return {
            colors,
            themes,
            settings,
            error: false,
        };
    } catch (e: unknown) {
        return {
            colors: [],
            themes: [],
            settings: null,
            error: true,
        };
    }
};

const Page = async () => {
    const session = await getSession();

    const { colors, themes, settings, error } = await fetchData();

    if (error) {
        return (
            <section className="section-vote">
                <div className="container">
                    <div className="error-message">Internal Server Error. Please try again later.</div>
                </div>
            </section>
        );
    }

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
