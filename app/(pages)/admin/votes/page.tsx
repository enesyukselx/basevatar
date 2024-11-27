import Link from "next/link";
import Votes from "../components/Votes/Votes";
import fetchVotes from "@/app/actions/admin/fetch-votes";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = async (props: { searchParams: SearchParams }) => {
    //
    const searchParams = await props.searchParams;
    const dayParam = searchParams.day as string;

    const { votes, day, error } = await fetchVotes({ param: dayParam });

    return (
        <section className="section-vote-admin">
            <div className="heading">
                <h1 className="title">Vote Settings</h1>
                <p className="subtitle">You can manage the vote section here. You can add, edit, and delete votes.</p>
                <p className="subtitle">
                    <strong>Current Day:</strong> {dayParam}
                </p>
            </div>
            <div className="flex gap-2 mt-2">
                {dayParam !== day && (
                    <Link href={`/admin/votes?day=${day}`} className="btn px-3 py-1">
                        Today
                    </Link>
                )}
                {+dayParam > 1 && (
                    <Link href={`/admin/votes?day=${+dayParam - 1}`} className="btn px-3 py-1">
                        Previous Day
                    </Link>
                )}
                <Link href={`/admin/votes?day=${+dayParam + 1}`} className="btn px-3 py-1">
                    Next Day
                </Link>
            </div>
            {error && <div className="error-message">Internal Server Error, Please try again later.</div>}
            <Votes data={votes} />
            <Link href={`/admin/votes/create?day=${day}`} className="btn px-3 py-1">
                Create Vote
            </Link>
        </section>
    );
};

export default Page;
