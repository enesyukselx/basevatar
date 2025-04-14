"use server";
import fetchSettings from "../common/fetch-settings";

const fetchDraw = async () => {
    try {
        const { setting: theme } = await fetchSettings("theme");
        const { setting: colors } = await fetchSettings("color");

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

export default fetchDraw;
