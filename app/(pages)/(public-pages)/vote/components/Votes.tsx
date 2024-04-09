"use client";

import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { sendVote } from "@/app/actions/public-pages/send-vote";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { IVote } from "@/app/types";

interface IVoteProps {
    data: IVote[];
    type: "color" | "theme";
    walletAddress: string;
    ethPrice: string;
}

const Votes = ({ data, type, walletAddress, ethPrice }: IVoteProps) => {
    const { data: hash, sendTransaction } = useSendTransaction();

    const router = useRouter();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    });

    const [voteId, setVoteId] = useState<string>("");

    const handleVote = (id: string) => {
        setVoteId(id);

        sendTransaction({
            to: "0x85C75c50E101623478205E5B7E38e79e982ad6e8",
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
            sendVote({ id: voteId, walletAddress });
            router.refresh();

            toast("Transaction confirmed", {
                position: "bottom-right",
                theme: "dark",
                transition: Bounce,
            });
        }
    }, [isConfirming, isConfirmed, voteId, router, walletAddress]);

    if (type === "color") {
        return data.map((color, index) => (
            <div className="vote-card color-palette" key={index}>
                <div className="colors">
                    {color.value.map((hex: string, index: number) => (
                        <div className="color" style={{ backgroundColor: hex }} key={index}></div>
                    ))}
                </div>
                <div className="color-vote">
                    <button disabled={isConfirming} className="vote-btn" onClick={() => handleVote(color.id)}>
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
