import Canvas from "@/app/components/Canvas/Canvas";
import CanvasContextProvider from "@/app/providers/CanvasContextProvider";
import { getSession } from "@/app/utils/sessionHelpers";
import WarningMessage from "./components/WarningMessage";
import fetchDraw from "@/app/actions/public-pages/fetch-draw";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";
import fetchSettings from "@/app/actions/common/fetch-settings";
import fetchPastDraws from "@/app/actions/public-pages/fetch-past-draws";
import { checkIfUserHasAlreadyUploaded } from "@/app/actions/public-pages/canvas-actions";
import Image from "next/image";
import { redirect } from "next/navigation";

const Page = async () => {
    const currDate = new Date().getTime();
    const session = await getSession();
    const { theme, colors, error: drawError } = await fetchDraw();
    const { setting: finishTime } = await fetchSettings("finish_time");
    const { setting: day } = await fetchSettings("day");

    const { pastDraws } = await fetchPastDraws({ session: session?.address! });

    if (!day || !finishTime || !theme || !colors) redirect("/");
    const userHasAlreadyUploaded = await checkIfUserHasAlreadyUploaded(+day, session?.address!);

    return (
        <section className="section-draw py-8">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Draw</h1>
                    <p className="subtitle">Draw your own design</p>
                </div>
                <div className="row">
                    <div className="lg:col-6">
                        {(!finishTime || !day || drawError) && <ServerErrorMessage />}
                        {session && session.address == null && <WarningMessage />}
                        {userHasAlreadyUploaded && (
                            <div className="py-4 text-red-300 font-bold">
                                You have already uploaded an image for today. Please come back tomorrow.
                                <div className="text-white py-2">Your draw</div>
                                <Image
                                    width={360}
                                    height={360}
                                    src={"https://" + process.env.AWS_S3_URL + "/" + userHasAlreadyUploaded.url}
                                    alt="image"
                                />
                            </div>
                        )}
                        {!drawError && session && session.address && !userHasAlreadyUploaded && (
                            <CanvasContextProvider>
                                <Canvas
                                    theme={theme}
                                    colors={colors}
                                    currentTime={currDate}
                                    finishTime={Number(finishTime) || 0}
                                />
                            </CanvasContextProvider>
                        )}
                    </div>
                    <div className="past-draws lg:col-6">
                        {session && session.address && pastDraws && (
                            <>
                                <h3 className="title">Your past draws</h3>
                                <div className="cards">
                                    {pastDraws.map((draw) => (
                                        <div key={draw.id} className="card">
                                            <div>DAY {draw.day}</div>
                                            <Image
                                                src={"https://" + process.env.AWS_S3_URL + "/" + draw.url}
                                                width={150}
                                                height={150}
                                                alt={`day-${draw.day}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;
