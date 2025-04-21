import createImage from "./utils/createImage";
import { getSettings, getVotes, updateSettingByKey } from "@basevatar/database";
import { serverStatusHelper } from "./utils/serverStatusHelper";
import postNewDayMessage from "./utils/slack/postNewDayMessage";

export async function cronjob() {
    try {
        //
        const imageServerStatus = await serverStatusHelper();
        if (!imageServerStatus) return;

        const date = new Date();
        const now = new Date().getTime();

        const settings = await getSettings();
        if (!settings) return;
        const { day, finish_time, theme, color } = settings;

        if (!finish_time || !day || !theme || !color) {
            console.log({ message: "Setting not found" });
            return;
        }

        if (now > +finish_time) {
            // Get votes
            const colorVotes = await getVotes(+day + 1, "color");
            const themeVotes = await getVotes(+day + 1, "theme");

            // Update Color
            if (colorVotes && colorVotes.votes.length !== 0 && colorVotes.maxCountItem) {
                await updateSettingByKey("color", colorVotes.maxCountItem);
            }
            // Update Theme
            if (themeVotes && themeVotes.votes.length !== 0 && themeVotes.maxCountItem) {
                await updateSettingByKey("theme", themeVotes.maxCountItem);
            }

            date.setUTCHours(23, 59, 59, 999);
            const new_finish_time = date.getTime() + 1;

            // Combine images with this function
            await createImage(+day, color, theme);
            //imagesCronjob(+day);

            // Update day
            await updateSettingByKey("day", (parseInt(day) + 1).toString());
            // Update finish time
            await updateSettingByKey("finish_time", new_finish_time.toString());
            if (!colorVotes || !themeVotes) return;
            await postNewDayMessage(
                +day + 1,
                new_finish_time,
                colorVotes.maxCountItem || color,
                themeVotes.maxCountItem || theme
            );

            console.log("Successfully updated");
        } else {
            console.log("Not yet");
        }
    } catch (e: unknown) {
        console.error(e);
    }
}
