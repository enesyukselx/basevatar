import Canvas from "@/app/components/Canvas/Canvas";
import CanvasContextProvider from "@/app/providers/CanvasContextProvider";
import { getSession } from "@/app/utils/sessionHelpers";
import WarningMessage from "./components/WarningMessage";
import fetchDraw from "@/app/actions/public-pages/fetch-draw";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";

const Page = async () => {
    const session = await getSession();
    const { theme, colors, error } = await fetchDraw();

    return (
        <section className="section-draw py-8">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Draw</h1>
                    <p className="subtitle">Draw your own design</p>
                    {error && <ServerErrorMessage />}
                    {session?.address == null && <WarningMessage />}
                    {!error && session?.address && (
                        <CanvasContextProvider>
                            <Canvas theme={theme!.value} colors={colors!.value} />
                        </CanvasContextProvider>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;
