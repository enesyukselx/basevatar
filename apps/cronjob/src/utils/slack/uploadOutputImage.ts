import fs from "fs";
import { WebClient } from "@slack/web-api";
import { cronjobConversationId } from "../../config";

const token = process.env.SLACK_BOT_TOKEN;

const uploadOutputImage = async (outputPath: string, day: number) => {
    const web = new WebClient(token);
    try {
        await web.filesUploadV2({
            channel_id: cronjobConversationId,
            initial_comment: "Today's output image.",
            file: fs.createReadStream(outputPath),
            filename: `day-${day}-output.jpg`,
        });

        console.log(`Successfully uploaded file in conversation ${cronjobConversationId}`);
    } catch (e) {
        console.error(e);
    }
};

export default uploadOutputImage;
