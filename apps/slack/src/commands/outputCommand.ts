import { app } from "../index";
import { getOutputByDay } from "../services/outputService";

const outputCommand = async () => {
    app.command("/output", async ({ command, ack, say }) => {
        //
        await ack();
        const day = parseInt(command.text);

        const output = await getOutputByDay(day);
        if (!output) {
            await say("Unable to retrieve output information.");
            return;
        }

        const { opensea_url, theme, colors, mint_count, contributors } = output;

        await say(`
        Day: ${day}
        - *Opensea URL:* ${opensea_url}
        - *Theme:* ${theme}
        - *Colors:* ${colors}
        - *Mint Count:* ${mint_count}
        - *Contributors:* ${contributors}
        `);
    });
};

export { outputCommand };
