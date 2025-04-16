import fetchVotes from "@/app/actions/public-pages/fetch-votes";
import Votes from "./components/Votes";
import { getSession } from "@/app/utils/sessionHelpers";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";

const Page = async () => {
    const session = await getSession();

    const { colors, themes, day, error } = await fetchVotes();

    if (error) {
        return (
            <section className="section-vote">
                <div className="container">
                    <ServerErrorMessage />
                </div>
            </section>
        );
    }

    return (
        <section className="section-vote">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Vote for Day #{Number(day) + 1 || 1} Themes</h1>
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
