import { app } from "../index";
import { getDay } from "../services/settingService";
import { addVote } from "../services/voteService";

type VoteType = "color" | "theme";

const voteCommand = async () => {
    app.command("/vote", async ({ command, ack, say }) => {
        //
        await ack();
        const voteType = command.text.split(" ")[0] as VoteType;
        const voteValue = command.text.split(" ")[1];
        const voteDayValue = command.text.split(" ")[2] ? +command.text.split(" ")[2] : undefined;
        const day = (await getDay()) ?? 1;
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

        if (!voteDay || voteDay <= +day) {
            // If no vote day is provided
            await say("Invalid vote day.");
            return;
        }

        if (voteType === "theme") {
            addVote({ type: voteType, value: voteValue, day: voteDay });
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
            addVote({ type: voteType, value: voteValue, day: voteDay });
            await say(`
                Your vote has been recorded.
                *Theme:* ${voteValue}
                *Day:* ${voteDay}
                `);
        }
    });
};

export { voteCommand };
