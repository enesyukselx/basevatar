import { prisma } from "@/app/lib/db";
import Canvas from "@/app/components/Canvas/Canvas";
import CanvasContextProvider from "@/app/providers/CanvasContextProvider";
import { getSession } from "@/app/utils/sessionHelpers";
import WarningMessage from "./components/WarningMessage";

const fetchData = async () => {
    "use server";
    try {
        const theme = await prisma.settings.findFirst({
            where: {
                key: "theme",
            },
        });

        const colors = await prisma.settings.findFirst({
            where: {
                key: "color",
            },
        });

        return {
            theme,
            colors,
            error: false,
        };
    } catch (e: unknown) {
        return {
            theme: null,
            colors: null,
            error: true,
        };
    }
};

const Page = async () => {
    //
    const session = await getSession();

    const { theme, colors, error } = await fetchData();

    return (
        <section className="section-draw py-8">
            <div className="container">
                <div className="heading">
                    <h1 className="title">Draw</h1>
                    <p className="subtitle">Draw your own design</p>
                    {error && <div className="error-message">Internal Server Error. Please try again later.</div>}
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
