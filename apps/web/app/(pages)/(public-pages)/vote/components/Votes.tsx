"use client";

import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { sendVote } from "@/app/actions/public-pages/send-vote";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { IVote } from "@/app/types";
import { useModal, useSIWE } from "connectkit";

interface IVoteProps {
    data: IVote[];
    type: "color" | "theme";
    walletAddress: string;
    ethPrice: string;
}

const Votes = ({ data, type, walletAddress, ethPrice }: IVoteProps) => {
    //
    const { setOpen } = useModal();
    const { isSignedIn } = useSIWE();

    const { data: hash, sendTransaction } = useSendTransaction();
    const router = useRouter();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const [voteId, setVoteId] = useState<string>("");

    const handleVote = (id: string) => {
        setVoteId(id);

        sendTransaction({
            to: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as "0x",
            value: parseEther(ethPrice),
        });
    };

    useEffect(() => {
        if (isConfirming) {
            toast("Waiting for confirmation...", {
                position: "bottom-right",
                theme: "dark",
                transition: Bounce,
            });
        }
        if (isConfirmed) {
            sendVote({ id: voteId, hash: hash as string });

            router.refresh();

            toast("Transaction confirmed", {
                position: "bottom-right",
                theme: "dark",
                transition: Bounce,
            });
        }
    }, [isConfirming, isConfirmed, voteId, router, walletAddress, hash]);

    if (type === "color") {
        return data.map((color, index) => (
            <div className="vote-card color-palette" key={index}>
                <div className="colors">
                    {color.value.map((hex: string, index: number) => (
                        <div className="color" style={{ backgroundColor: hex }} key={index}></div>
                    ))}
                </div>
                <div className="color-vote">
                    <button
                        disabled={isConfirming}
                        className="vote-btn"
                        onClick={() => {
                            if (!isSignedIn) {
                                setOpen(true);
                                return;
                            }
                            handleVote(color.id);
                        }}
                    >
                        {isConfirming ? "Confirming..." : `Vote (${color.count})`}
                    </button>
                </div>
            </div>
        ));
    }

    if (type === "theme") {
        return data.map((subject, index) => (
            <div className="vote-card subject" key={index}>
                <div className="title">Theme: {subject.value[0]}</div>
                <div className="subject-vote">
                    <button
                        disabled={isConfirming}
                        className="vote-btn"
                        onClick={() => {
                            if (!isSignedIn) {
                                setOpen(true);
                                return;
                            }
                            handleVote(subject.id);
                        }}
                    >
                        {isConfirming ? "Confirming..." : `Vote (${subject.count})`}
                    </button>
                </div>
            </div>
        ));
    }
};

export default Votes;
