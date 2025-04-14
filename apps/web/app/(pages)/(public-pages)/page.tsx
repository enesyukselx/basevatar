import Image from "next/image";
import Link from "next/link";
import srcPixelArtWebp from "@/app/assets/img/pixel-art.webp";

export default function Home() {
    return (
        <section className="section-intro">
            <div className="container">
                <div className="row">
                    <div className="lg:col-6 intro">
                        <p className="primary-text">
                            <span className="text-orange-300 font-semibold">Create. Combine. Mint.</span> <br />
                            Join our <span className="text-red-400 font-semibold">Web3 art revolution.</span>{" "}
                            <span className="text-blue-400 font-semibold"> Connect your wallet</span> to draw. <br />
                            <span className="text-amber-500 font-semibold"> Earn by creating</span> - share in the
                            profits. <br />
                            <span className="text-green-300 font-semibold"> Be creative.</span>
                        </p>

                        <div className="mt-8 links">
                            <Link className="btn" href="/draw">
                                Start Drawing
                            </Link>
                            <Link className="btn" href="/gallery">
                                Our Collection
                            </Link>
                        </div>
                    </div>
                    <div className="lg:col-6">
                        <div className="image">
                            <Image priority src={srcPixelArtWebp} alt="Basevatar Intro" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
