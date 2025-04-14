import { prisma } from "../lib/db";

const createOutput = async (
    openSeaUrl: string,
    day: number,
    colors: string[],
    theme: string,
    contributors: string[]
) => {
    try {
        const endTime = new Date();
        endTime.setUTCHours(23, 59, 59, 999);

        const output = await prisma.output.create({
            data: {
                opensea_url: openSeaUrl,
                day,
                colors,
                theme,
                contributors,
                end_time: endTime,
            },
        });
        return output;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export { createOutput };
