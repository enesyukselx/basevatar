"use client";

import { useSearchParams } from "next/navigation";
import { voteDelete } from "@/app/actions/admin/vote-delete";

const VoteDeleteButton = ({ children, voteId }: { children: React.ReactNode; voteId: string }) => {
    const searchParams = useSearchParams();

    const day = searchParams.get("day") || "1";

    return (
        <button
            className="btn px-3 py-1"
            onClick={() => {
                if (confirm("Are you sure you want to delete this vote?")) {
                    alert(`Deleting vote with id ${voteId}`);
                    voteDelete(voteId, day);
                }
            }}
        >
            {children}
        </button>
    );
};

export default VoteDeleteButton;
