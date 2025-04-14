import { WebClient } from "@slack/web-api";
const token = process.env.SLACK_BOT_TOKEN;

export const postNewSlackMessage = async (conservationId: string, text: string) => {
    const web = new WebClient(token);

    try {
        const result = await web.chat.postMessage({
            text,
            channel: conservationId,
        });

        console.log(`Successfully send message ${result.ts} in conversation ${conservationId}`);
    } catch (e) {
        console.error(e);
    }
};
