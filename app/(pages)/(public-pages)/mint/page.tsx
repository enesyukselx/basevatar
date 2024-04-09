import Image from "next/image";
import CountDown from "./components/CountDown";

import { prisma } from "@/app/lib/db";

const Page = async () => {
    const currDate = new Date();

    const item = await prisma.gallery.findFirst({
        orderBy: {
            created_at: "desc",
        },
    });

    return (
        <section className="section-mint">
            <div className="container">
                <div className="row flex-wrap-reverse gap-y-8 md:gap-y-0">
                    <div className="md:col-4">
                        <Image
                            src={item?.image_url || ""}
                            width={1000}
                            height={1000}
                            alt="intro-img-1"
                            className="rounded"
                        />
                    </div>
                    <div className="md:col-8 mint">
                        <h3 className="mint-title">{item?.title}</h3>
                        <div className="color-palette">
                            <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                            <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                            <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                        </div>
                        <CountDown currDate={currDate} date={item?.end_date || ""} />
                        <div className="contributors">
                            <div className="title">Contributors</div>
                            <p>
                                cryptomoogle.eth, deanharvey.eth, 0x4241…38a0, judebuffum.eth, olotus.eth,
                                bombadilus.eth, numo.eth, notoriousman.eth, trombopoline.eth, 0xbheem.eth, ...{" "}
                                <span className="text-amber-500">489 total artists</span>
                            </p>
                        </div>

                        <div className="mint-button mt-4">
                            <button>MINT</button>
                            <span>0.0026 ETH • 468 MINTED</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
