import { app } from "../index";
import { getSettings } from "../services/settingService";

const settingsCommand = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.command("/settings", async ({ command, ack, say }) => {
        //
        const settings = await getSettings();
        if (!settings) {
            await ack();
            await say("Unable to retrieve settings.");
            return;
        }
        const { day, finish_time, theme, color } = settings;

        await ack();
        await say(`
        Your current settings are:
        - *Day:* ${day?.value}
        - *Finish Time:* ${finish_time?.value}
        - *Theme:* ${theme?.value}
        - *Color:* ${color?.value}
            `);
    });
};

export { settingsCommand };
