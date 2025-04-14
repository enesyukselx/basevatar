import { app } from "../index";
import { getImageById } from "../services/imageService";

const imageCommand = async () => {
    app.command("/image", async ({ command, ack, say }) => {
        //
        await ack();
        const id = command.text;

        const image = await getImageById(id);
        if (!image) {
            await say("Unable to retrieve image information.");
            return;
        }

        const { day, url, address, isReviewed, isApproved, isDeleted } = image;

        await say(`
        Image: ${id}
        - *Day:* ${day}
        - *URL:* ${url}
        - *Address:* ${address}
        - *Reviewed:* ${isReviewed}
        - *Approved:* ${isApproved}
        - *Deleted:* ${isDeleted}
        `);
    });
};

export { imageCommand };
