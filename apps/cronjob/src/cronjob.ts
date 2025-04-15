import createImage from "./utils/createImage";
import { getSettings, updateSettings } from "./services/settingService";
import { getVotes } from "./services/voteService";
import { postNewDayMessage } from "./utils/slackHelpers";
import { serverStatusHelper } from "./utils/serverStatusHelper";

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

        if (now > +finish_time.value) {
            // Get votes
            const colorVotes = await getVotes(+day.value + 1, "color");
            const themeVotes = await getVotes(+day.value + 1, "theme");

            // Update Color
            if (colorVotes && colorVotes.votes.length !== 0 && colorVotes.maxCountItem) {
                await updateSettings(color.id, colorVotes.maxCountItem);
            }
            // Update Theme
            if (themeVotes && themeVotes.votes.length !== 0 && themeVotes.maxCountItem) {
                await updateSettings(theme.id, themeVotes.maxCountItem);
            }

            date.setUTCHours(23, 59, 59, 999);
            const new_finish_time = date.getTime() + 1;

            // Combine images with this function
            await createImage(+day.value, color.value, theme.value);
            //imagesCronjob(+day.value);

            // Update day
            await updateSettings(day.id, (parseInt(day.value) + 1).toString());
            // Update finish time
            await updateSettings(finish_time.id, new_finish_time.toString());
            if (!colorVotes || !themeVotes) return;
            await postNewDayMessage(
                +day.value + 1,
                new_finish_time,
                colorVotes.maxCountItem || color.value,
                themeVotes.maxCountItem || theme.value
            );

            console.log("Successfully updated");
        } else {
            console.log("Not yet");
        }
    } catch (e: unknown) {
        console.error(e);
    }
}
