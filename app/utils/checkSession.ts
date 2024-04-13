import getSession from "./getSession";

export async function checkAdmin(): Promise<boolean> {
    const session = await getSession();
    if (!session || !session.address || session.address !== process.env.ADMIN_WALLET_ADDRESS) {
        return false;
    }
    return true;
}

export async function checkSession(): Promise<boolean> {
    const session = await getSession();
    if (!session?.address) {
        return false;
    }
    return true;
}
