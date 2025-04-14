declare namespace NodeJS {
    interface ProcessEnv {
        SESSION_SECRET: string;
        NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
        DATABASE_URL: string;
        ADMIN_WALLET_ADDRESS: string;
        NEXT_PUBLIC_CONTRACT_ADDRESS: string;
        NEXT_PUBLIC_VOTE_PRICE: string;
        NEXT_PUBLIC_LOCALSTORAGE_KEY: string;
        LOCALSTORAGE_KEY: string;
        NEXTAUTH_URL: string;
        SLACK_BOT_TOKEN: string;
        NEXT_PUBLIC_BASE_URL: string;
        UPLOAD_OUTPUT_API_KEY: string;
        AWS_BUCKET_NAME: string;
        AWS_REGION: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_S3_URL: string;
    }
}
