import { app } from "../index";
import { reviewImage } from "../services/imageService";

type TReview = "approve" | "reject";

const reviewCommand = async () => {
    app.command("/review", async ({ command, ack, say }) => {
        //
        await ack();
        const review: TReview = command.text.split(" ")[0] as TReview;

        if (!review || (review !== "approve" && review !== "reject")) {
            await say("Invalid review.");
            return;
        }

        const id = command.text.split(" ")[1];

        if (!id || !/^[a-fA-F0-9]{24}$/.test(id)) {
            await say("Invalid id.");
            return;
        }

        await say("Image reviewed.");
        await reviewImage(id, review);
    });
};

export { reviewCommand };
