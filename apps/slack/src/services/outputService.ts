import { prisma } from "@basevatar/database";

const getOutputByDay = async (day: number) => {
    try {
        //
        if (!day) {
            return null;
        }

        const output = await prisma.output.findFirst({
            where: {
                day,
                isDeleted: false,
            },
        });

        if (!output) {
            return null;
        }

        return {
            day: output.day,
            opensea_url: output.opensea_url,
            theme: output.theme,
            colors: output.colors,
            mint_count: output.mint_count,
            contributors: output.contributors,
        };
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { getOutputByDay };
