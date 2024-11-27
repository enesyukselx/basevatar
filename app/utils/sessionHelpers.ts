import { cookies } from "next/headers";
import { unsealData } from "iron-session/edge";

type TSessionData = {
    nonce: string;
    address: string;
    chainId: number;
} | null;

export const getSession = async (): Promise<TSessionData> => {
    const cookieStore = await cookies();
    const encryptedSession = cookieStore.get("web3session")?.value;

    const session: TSessionData = encryptedSession
        ? await unsealData(encryptedSession, {
              password: process.env.SESSION_SECRET as string,
          })
        : null;

    return session;
};

export const isSessionValid = async (): Promise<boolean> => {
    const session = await getSession();
    if (!session || !session.address || !session.chainId || !session.nonce) {
        return false;
    }
    return true;
};

export const isAdmin = async (): Promise<boolean> => {
    const session = await getSession();
    if (!session || !session.address || session.address !== process.env.ADMIN_WALLET_ADDRESS) {
        return false;
    }
    return true;
};
