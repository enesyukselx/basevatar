import Image from "next/image";
import CountDown from "./components/CountDown";
import fetchMint from "@/app/actions/public-pages/fetch-mint";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";

export const revalidate = 0;

const Page = async () => {
    const { item, error } = await fetchMint();

    if (error || !item) {
        return (
            <section className="section-mint">
                <div className="container">
                    <ServerErrorMessage message="First mint is coming soon. Stay tuned!" />
                </div>
            </section>
        );
    }

    return (
        <section className="section-mint">
            <div className="container">
                <div className="row flex-wrap-reverse gap-y-8 md:gap-y-0">
                    <div className="md:col-4">
                        <Image
                            src={`/outputs/output-day-${item.day}.jpg`}
                            width={1000}
                            height={1000}
                            priority
                            alt="intro-img-1"
                            className="rounded"
                        />
                    </div>
                    <div className="md:col-8 mint">
                        <h3 className="mint-title">
                            #Day {item.day} - {item.theme}
                        </h3>
                        <div className="color-palette">
                            <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                            <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                        </div>

                        <CountDown date={item.end_time} />

                        <div className="contributors">
                            <div className="title">Contributors</div>
                            <p>
                                {item?.contributors?.map((contributors, id) => (
                                    <span key={id} className="text-amber-500">
                                        {contributors}
                                    </span>
                                ))}{" "}
                            </p>
                        </div>

                        <div className="mint-button mt-4">
                            <button>MINT</button>
                            <span>
                                {Number(process.env.NEXT_PUBLIC_VOTE_PRICE) * item.mint_count} ETH • {item.mint_count}{" "}
                                MINTED
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
