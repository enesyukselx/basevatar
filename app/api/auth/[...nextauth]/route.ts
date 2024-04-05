import type { SIWESession } from "@web3modal/siwe";
import NextAuth from "next-auth/next";
import authOptions from "./options";

declare module "next-auth" {
    interface Session extends SIWESession {
        address: string;
        chainId: number;
    }
}

// Get your projectId on https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
    throw new Error("NEXT_PUBLIC_PROJECT_ID is not set");
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
