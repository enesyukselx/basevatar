import authOptions from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function checkAdmin(): Promise<boolean> {
    const session = await getServerSession(authOptions);
    if (!session || !session.address || session.address !== process.env.ADMIN_WALLET_ADDRESS) {
        return false;
    }
    return true;
}
