"use server";
import { prisma } from "@basevatar/database";

type TSettingKey = "day" | "theme" | "color" | "finish_time";
interface ISettingResponse {
    setting: string | null;
}

const fetchSettings = async (key: TSettingKey): Promise<ISettingResponse> => {
    try {
        const setting = await prisma.setting.findMany();

        switch (key) {
            case "day":
                return {
                    setting: setting.find((setting) => setting.key === "day")!.value,
                };
            case "theme":
                return {
                    setting: setting.find((setting) => setting.key === "theme")!.value,
                };
            case "color":
                return {
                    setting: setting.find((setting) => setting.key === "color")!.value,
                };
            case "finish_time":
                return {
                    setting: setting.find((setting) => setting.key === "finish_time")!.value,
                };
            default:
                return {
                    setting: null,
                };
        }
    } catch (e: unknown) {
        return {
            setting: null,
        };
    }
};

export default fetchSettings;
