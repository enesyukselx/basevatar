import Canvas from "@/app/components/Canvas/Canvas";
import CanvasContextProvider from "@/app/providers/CanvasContextProvider";
import { getSession } from "@/app/utils/sessionHelpers";
import WarningMessage from "./components/WarningMessage";
import fetchDraw from "@/app/actions/public-pages/fetch-draw";
import ServerErrorMessage from "@/app/components/common/ServerErrorMessage";
import fetchSettings from "@/app/actions/common/fetch-settings";

const Page = async () => {
    const session = await getSession();
    const { theme, colors, error: drawError } = await fetchDraw();
    const { settings, error: settingsError } = await fetchSettings();
    const day = settings?.find((setting) => setting.key === "day")?.value;

    return (
        <section className="section-draw py-8">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Draw</h1>
                    <p className="subtitle">Draw your own design</p>
                    {(settingsError || drawError) && <ServerErrorMessage />}
                    {session?.address == null && <WarningMessage />}
                    {!drawError && session?.address && (
                        <CanvasContextProvider>
                            <Canvas theme={theme!.value} colors={colors!.value} day={day ?? "1"} />
                        </CanvasContextProvider>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;
