declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        SLACK_BOT_TOKEN: string;
        SERVER_URL: string;
        UPLOAD_OUTPUT_API_KEY: string;
        AWS_S3_URL: string;
        TIMEZONE: string;
    }
}
