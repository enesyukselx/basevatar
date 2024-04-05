import Image from "next/image";
import Link from "next/link";
import srcIntroImg1 from "../assets/img/intro-img-1.png";
import srcIntroImg2 from "../assets/img/intro-img-2.png";
import srcIntroImg3 from "../assets/img/intro-img-3.png";
import srcIntroImg4 from "../assets/img/intro-img-4.png";

export default function Home() {
    return (
        <section className="section-intro">
            <div className="container">
                <div className="row">
                    <div className="lg:col-6 intro">
                        <p className="primary-text">
                            <span className="text-orange-300 font-semibold">Lorem ipsum dolor</span> <br />
                            sit amet consectetur, elit.{" "}
                            <span className="text-blue-400 font-semibold"> Nobis eligendi nam laborum</span> debitis
                            voluptate,
                            <span className="text-amber-500 font-semibold"> cum soluta minima</span>, et, ut blanditiis
                            <span className="text-red-400 font-semibold"> deserunt ex officia?</span>
                            <span className="text-green-300 font-semibold">Lorem dolor</span> sit amet <br />
                            consectetur, elit.
                        </p>

                        <div className="mt-8 links">
                            <Link href="/draw">Start Drawing</Link>
                            <Link href="/earn">Earn Points</Link>
                        </div>
                    </div>
                    <div className="lg:col-6">
                        <div className="images">
                            <Image src={srcIntroImg1} alt="" />
                            <Image src={srcIntroImg2} alt="" />
                            <Image src={srcIntroImg3} alt="" />
                            <Image src={srcIntroImg4} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
