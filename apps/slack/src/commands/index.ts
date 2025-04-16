import { userCommand } from "./userCommand";
import { imageCommand } from "./imageCommand";
import { outputCommand } from "./outputCommand";
import { settingsCommand } from "./settingsCommand";
import { voteCommand } from "./voteCommand";
import { reviewCommand } from "./reviewCommand";

const commands = async () => {
    await userCommand(); // /user
    await imageCommand(); // /image
    await outputCommand(); // /output
    await settingsCommand(); // /settings
    await voteCommand(); // /vote
    await reviewCommand(); // /review
};

export { commands };
