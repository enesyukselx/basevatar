import { createVote, getSettings } from "@basevatar/database";
import { app } from "../index";

type VoteType = "color" | "theme";

const voteCommand = async () => {
    app.command("/vote", async ({ command, ack, say }) => {
        //
        await ack();
        const voteType = command.text.split(" ")[0] as VoteType;
        const voteValue = command.text.split(" ")[1];
        const voteDayValue = command.text.split(" ")[2] ? +!command.text.split(" ")[2] : undefined;
        const settings = await getSettings();
        if (!settings) {
            await say("Unable to retrieve settings.");
            return;
        }
        const { day } = settings;
        // if vote day is not provided, set it to day + 2
        const voteDay = voteDayValue ?? (day ? +day + 2 : undefined);

        if (voteType !== "color" && voteType !== "theme") {
            // If vote type is not color or theme
            await say("Invalid vote type.");
            return;
        }

        if (!voteValue) {
            // If no vote value is provided
            await say("Invalid vote value.");
            return;
        }

        if (!voteDay || (day !== undefined && voteDay <= +day)) {
            // If no vote day is provided or day is not greater than the current day
            await say("Invalid vote day.");
            return;
        }

        if (voteType === "theme") {
            createVote({ type: voteType, value: voteValue, day: voteDay });
            await say(`
                Your vote has been recorded.
                *Theme:* ${voteValue}
                *Day:* ${voteDay}
                `);
        }

        if (voteType === "color") {
            if (voteValue.split(",").length < 3) {
                await say("Invalid vote value. You must provide 3 colors.");
                return;
            }
            if (voteValue.split(",").some((color) => !/^#[0-9A-F]{6}$/i.test(color))) {
                await say("Invalid vote value. You must provide colors in hex format.");
                return;
            }
            createVote({ type: voteType, value: voteValue, day: voteDay });
            await say(`
                Your vote has been recorded.
                *Theme:* ${voteValue}
                *Day:* ${voteDay}
                `);
        }
    });
};

export { voteCommand };
