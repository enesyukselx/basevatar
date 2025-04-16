import { cronjob } from "./cronjob";
import cron from "node-cron";

cron.schedule(
    "01 00 * * *",
    () => {
        console.log("Running a job at 00:01 at Etc/UTC timezone");
        cronjob();
    },
    {
        scheduled: true,
        timezone: process.env.TIMEZONE || "Etc/UTC",
    }
);

console.log("Cronjob started");
