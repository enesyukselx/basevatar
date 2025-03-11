import fs from "fs";
import { WebClient } from "@slack/web-api";
const token = process.env.SLACK_BOT_TOKEN;
const cronjobConservationId = "C07852QAT8B";

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
            channel: cronjobConservationId,
        });

        console.log(`Successfully send message ${result.ts} in conversation ${cronjobConservationId}`);
    } catch (e) {
        console.error(e);
    }
};

const uploadOutputImage = async (outputPath: string, day: number) => {
    const web = new WebClient(token);
    try {
        await web.filesUploadV2({
            channel_id: cronjobConservationId,
            initial_comment: "Today's output image.",
            file: fs.createReadStream(outputPath),
            filename: `day-${day}-output.jpg`,
        });

        console.log(`Successfully uploaded file in conversation ${cronjobConservationId}`);
    } catch (e) {
        console.error(e);
    }
};

export { postNewDayMessage, uploadOutputImage };
