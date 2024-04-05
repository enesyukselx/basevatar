import Link from "next/link";
import Image from "next/image";

import srcIntroImg1 from "@/app/assets/img/intro-img-1.png";
import srcIntroImg2 from "@/app/assets/img/intro-img-2.png";
import srcIntroImg3 from "@/app/assets/img/intro-img-3.png";
import srcIntroImg4 from "@/app/assets/img/intro-img-4.png";
import { LucideDownload, LucideSailboat } from "lucide-react";

const Page = () => {
    return (
        <section className="section-gallery">
            <div className="container">
                <div className="row">
                    <div className="heading">
                        <h1 className="title">Gallery</h1>
                        <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div className="gallery">
                        <div className="item">
                            <div className="image">
                                <Image src={srcIntroImg1} alt="" />
                            </div>
                            <div className="title">
                                <h6>Day #234: Easter Egg Hunt</h6>
                                <div className="color-palette">
                                    <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                                </div>
                            </div>
                            <div className="button">
                                <Link href="/">BUY 0.001 ETH</Link>
                            </div>
                            <div className="links">
                                <Link href="/">
                                    <LucideDownload size={16} />
                                    Download
                                </Link>
                                <Link href="/">
                                    <LucideSailboat size={16} />
                                    View on Opensea
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image">
                                <Image src={srcIntroImg2} alt="" />
                            </div>
                            <div className="title">
                                <h6>Day #234: Easter Egg Hunt</h6>
                                <div className="color-palette">
                                    <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                                </div>
                            </div>
                            <div className="button">
                                <Link href="/">BUY 0.001 ETH</Link>
                            </div>
                            <div className="links">
                                <Link href="/">
                                    <LucideDownload size={16} />
                                    Download
                                </Link>
                                <Link href="/">
                                    <LucideSailboat size={16} />
                                    View on Opensea
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image">
                                <Image src={srcIntroImg3} alt="" />
                            </div>
                            <div className="title">
                                <h6>Day #234: Easter Egg Hunt</h6>
                                <div className="color-palette">
                                    <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                                </div>
                            </div>
                            <div className="button">
                                <Link href="/">BUY 0.001 ETH</Link>
                            </div>
                            <div className="links">
                                <Link href="/">
                                    <LucideDownload size={16} />
                                    Download
                                </Link>
                                <Link href="/">
                                    <LucideSailboat size={16} />
                                    View on Opensea
                                </Link>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image">
                                <Image src={srcIntroImg4} alt="" />
                            </div>
                            <div className="title">
                                <h6>Day #234: Easter Egg Hunt</h6>
                                <div className="color-palette">
                                    <div className="color" style={{ backgroundColor: "#FFD700" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FFA500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF6347" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF4500" }}></div>
                                    <div className="color" style={{ backgroundColor: "#FF0000" }}></div>
                                </div>
                            </div>
                            <div className="button">
                                <Link href="/">BUY 0.001 ETH</Link>
                            </div>
                            <div className="links">
                                <Link href="/">
                                    <LucideDownload size={16} />
                                    Download
                                </Link>
                                <Link href="/">
                                    <LucideSailboat size={16} />
                                    View on Opensea
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
