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

const getDay = async () => {
    const settings = await getSettings();
    return settings?.day?.value;
};

export { getSettings, getDay };
