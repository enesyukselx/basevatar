declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        DATABASE_URL: string;
        SLACK_BOT_TOKEN: string;
        SLACK_APP_TOKEN: string;
        SLACK_SIGNING_SECRET: string;
        AWS_S3_URL: string;
        TIMEZONE: string;
    }
}
