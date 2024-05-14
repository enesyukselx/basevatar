import Link from "next/link";
import Image from "next/image";
import { LucideDownload, LucideSailboat } from "lucide-react";
import fetchGallery from "@/app/actions/public-pages/fetch-gallery";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";

const Page = async () => {
    const currDate = new Date();
    const { items, error } = await fetchGallery();

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
                                            src={item.image_url}
                                            alt=""
                                            layout="responsive"
                                            width={900}
                                            height={600}
                                        />
                                    </div>
                                    <div className="title">
                                        <h6>{item.title}</h6>
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
                                        {new Date(item.end_date) < currDate ? (
                                            <Link href={item.opensea_url}>BUY</Link>
                                        ) : (
                                            <Link href="" className="mint-btn">
                                                MINT
                                            </Link>
                                        )}
                                    </div>
                                    <div className="links">
                                        <Link href={item.image_url} target="_blank">
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
