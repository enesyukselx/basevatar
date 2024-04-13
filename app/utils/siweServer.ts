import { configureServerSideSIWE } from "connectkit-next-siwe";

export const siweServer = configureServerSideSIWE({
    session: {
        cookieName: "web3session",
        password: process.env.NEXTAUTH_SECRET,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    },
});
