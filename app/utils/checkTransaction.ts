import { getTransaction } from "wagmi/actions";
import { config } from "../config/wagmi";
import getSession from "./getSession";

export async function checkTransaction(hash: string) {
    const session = await getSession();
    const walletAddress = session?.address as string;

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
