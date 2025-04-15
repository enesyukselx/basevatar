import { prisma } from "@basevatar/database";

const getSettings = async () => {
    try {
        const settings = await prisma.setting.findMany();
        const day = settings.find((setting) => setting.key === "day");
        const finish_time = settings.find((setting) => setting.key === "finish_time");
        const theme = settings.find((setting) => setting.key === "theme");
        const color = settings.find((setting) => setting.key === "color");
        return { day, finish_time, theme, color };
    } catch (e) {
        console.error(e);
        return null;
    }
};

const updateSettings = async (id: string, value: string) => {
    try {
        await prisma.setting.update({
            where: {
                id: id,
            },
            data: {
                value: value,
            },
        });
    } catch (e) {
        console.error(e);
    }

    return;
};

export { getSettings, updateSettings };
