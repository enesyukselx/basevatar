import { app } from "../index";
import { getUserInfoByWalletId } from "../services/userService";

const userCommand = async () => {
    app.command("/user", async ({ command, ack, say }) => {
        //
        await ack();
        const id = command.text;

        const user = await getUserInfoByWalletId(id);
        if (!user) {
            await say("Unable to retrieve user information.");
            return;
        }

        const { countImages, images } = user;

        await say(`
        User: ${id}
        - *Images:* ${countImages}
        - *Image Details:*
        ${images.map((image) => {
            return `
            - *Day:* ${image.day}
            - *URL:* ${image.url}
            - *Reviewed:* ${image.isReviewed}
            - *Approved:* ${image.isApproved}
            - *Deleted:* ${image.isDeleted}
            `;
        })}
        `);
    });
};

export { userCommand };
