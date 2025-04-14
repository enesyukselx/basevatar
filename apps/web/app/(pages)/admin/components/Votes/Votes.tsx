import { IVote } from "@/app/types";
import classes from "./Votes.module.scss";
import VoteDeleteButton from "./VoteDeleteButton";

const Votes = ({ data }: { data: IVote[] }) => {
    return (
        <div className={classes.votes}>
            {data.length === 0 && (
                <div className={`${classes["vote-item"]} !border-red-900 !bg-red-300 !text-black font-bold text-lg`}>
                    No votes found.
                </div>
            )}
            {data.map((vote) => {
                return (
                    <div key={vote.id} className={classes["vote-item"]}>
                        <div className={classes.type}>
                            {vote.type === "color" ? "Color" : "Theme " + vote.value} (Total Count: {vote.count})
                        </div>
                        {vote.type === "color" && (
                            <div className={classes.value}>
                                {vote.value.map((v, i) => (
                                    <span
                                        key={i}
                                        style={{ backgroundColor: v }}
                                        className={`px-2 py-1 mr-2 ${classes.color} text-black font-bold`}
                                    >
                                        {v}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="mt-4">
                            <VoteDeleteButton voteId={vote.id}>Delete</VoteDeleteButton>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Votes;
