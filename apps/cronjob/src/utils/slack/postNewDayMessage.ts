import { WebClient } from "@slack/web-api";
import { cronjobConversationId } from "../../config";
const token = process.env.SLACK_BOT_TOKEN;

const postNewDayMessage = async (day: number, finishTime: number, color: string, theme: string) => {
    const web = new WebClient(token);
    try {
        const result = await web.chat.postMessage({
            text: `
*Day ${day}*
*Finish Time* ${new Date(finishTime).toLocaleString()}
*Colors:* ${color}
*Theme:* ${theme}
            `,
            channel: cronjobConversationId,
        });

        console.log(`Successfully send message ${result.ts} in conversation ${cronjobConversationId}`);
    } catch (e) {
        console.error(e);
    }
};

export default postNewDayMessage;
