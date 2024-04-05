import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

const nextAuthSecret = process.env.NEXTAUTH_SECRET;
if (!nextAuthSecret) {
    throw new Error("NEXTAUTH_SECRET is not set");
}

const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    secret: nextAuthSecret,
    providers: [
        credentialsProvider({
            name: "Ethereum",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: "0x0",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0",
                },
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.message) {
                        throw new Error("SiweMessage is undefined");
                    }
                    const siwe = new SiweMessage(credentials.message);
                    const nonce = await getCsrfToken({ req: { headers: req.headers } });
                    const result = await siwe.verify({
                        signature: credentials?.signature || "",
                        nonce,
                    });
                    if (result.success) {
                        return {
                            id: `eip155:${siwe.chainId}:${siwe.address}`,
                        };
                    }

                    return null;
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        session({ session, token }) {
            if (!token.sub) {
                return session;
            }

            const [, chainId, address] = token.sub.split(":");
            if (chainId && address) {
                session.address = address;
                session.chainId = parseInt(chainId, 10);
            }

            return session;
        },
    },
};

export default authOptions;
