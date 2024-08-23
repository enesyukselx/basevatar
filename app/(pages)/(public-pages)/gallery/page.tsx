import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import Image from "next/image";
import { LucideDownload, LucideSailboat } from "lucide-react";
import fetchOutputs from "@/app/actions/public-pages/fetch-outputs";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";

const Page = async () => {
    noStore();
    const currDate = new Date();
    const { items, error } = await fetchOutputs();

    return (
        <section className="section-gallery">
            <div className="container">
                <div className="row">
                    <div className="heading">
                        <h1 className="title">Gallery</h1>
                        <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="gallery">
                        {!error &&
                            items.map((item) => (
                                <div className="item" key={item.id}>
                                    <div className="image">
                                        <Image
                                            src={`https://${process.env.AWS_S3_URL}/outputs/output-day-${item.day}.jpg`}
                                            alt={`Day ${item.day} Output`}
                                            layout="responsive"
                                            width={900}
                                            height={600}
                                        />
                                    </div>
                                    <div className="title">
                                        <h6>
                                            #Day{item.day} - {item.theme}
                                        </h6>
                                        <div className="color-palette">
                                            {item.colors.map((color, index) => (
                                                <div
                                                    className="color"
                                                    style={{ backgroundColor: color }}
                                                    key={index}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="button">
                                        {new Date(item.end_time) < currDate ? (
                                            <Link href={item.opensea_url}>BUY</Link>
                                        ) : (
                                            <Link href="" className="mint-btn">
                                                MINT
                                            </Link>
                                        )}
                                    </div>
                                    <div className="links">
                                        <Link
                                            href={`https://${process.env.AWS_S3_URL}/outputs/output-day-${item.day}.jpg`}
                                            target="_blank"
                                        >
                                            <LucideDownload size={16} />
                                            Download
                                        </Link>
                                        <Link href={item.opensea_url} target="_blank">
                                            <LucideSailboat size={16} />
                                            View on Opensea
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                {error && <ServerErrorMessage />}
            </div>
        </section>
    );
};

export default Page;
