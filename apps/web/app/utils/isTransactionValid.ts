import { getTransaction } from "wagmi/actions";
import { config } from "../config/wagmi";
import { getSession } from "./sessionHelpers";

export async function isTransactionValid(hash: string) {
    //
    const session = await getSession();
    if (!session?.address) throw new Error("No session found");

    const walletAddress = session?.address;
    const transaction = await getTransaction(config, {
        hash: hash as "0x",
    });

    const transactionValue = BigInt(transaction.value);
    const votePrice = parseFloat(process.env.NEXT_PUBLIC_VOTE_PRICE as string);

    if (isNaN(votePrice)) return false;

    if (
        transactionValue === BigInt(votePrice * 1e18) &&
        transaction.to?.toLowerCase() == process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.toLowerCase() &&
        transaction.from?.toLowerCase() == walletAddress.toLowerCase()
    )
        return true;

    return false;
}
