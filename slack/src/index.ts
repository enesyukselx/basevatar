import "dotenv/config";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { App } from "@slack/bolt";
import { commands } from "./commands";

export const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
    scopes: ["channels:history", "chat:write", "commands"],
});

commands();

(async () => {
    try {
        await app.start(process.env.PORT || 3000);
        console.log("⚡️ Bolt app is running! ⚡️");
    } catch (error) {
        console.error("Unable to start App", error);
        process.exit(1);
    }
})();
