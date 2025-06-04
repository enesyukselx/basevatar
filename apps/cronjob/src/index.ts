import "dotenv/config";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();
import { cronjob } from "./cronjob";
import cron from "node-cron";

cron.schedule(
    "01 00 * * *",
    () => {
        console.log("Running a job at 00:01 at Etc/UTC timezone");
        cronjob();
    },
    {
        timezone: process.env.TIMEZONE || "Etc/UTC",
    }
);

console.log("Cronjob started");
// Run the cronjob immediately on startup
cronjob();
