import { cookies } from "next/headers";
import { unsealData } from "iron-session/edge";

type TSessionData = {
    nonce: string;
    address: string;
    chainId: number;
};

const getSession = async (): Promise<TSessionData | null> => {
    const cookieStore = cookies();
    const encryptedSession = cookieStore.get("web3session")?.value;

    const session: TSessionData | null = encryptedSession
        ? await unsealData(encryptedSession, {
              password: process.env.SESSION_SECRET as string,
          })
        : null;

    return session;
};

export default getSession;
