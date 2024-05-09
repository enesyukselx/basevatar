import { prisma } from "@/app/lib/db";
import Link from "next/link";
import Votes from "../components/Votes/Votes";

const fetchData = async ({ param }: { param: string }) => {
    "use server";
    try {
        const settings = await prisma.settings.findFirst({
            where: {
                key: "day",
            },
        });

        let day = param ? (parseInt(param) > 0 ? param : "1") : (settings?.value as string);

        const votes = await prisma.votes.findMany({
            where: {
                day: parseInt(day),
                isDeleted: false,
            },
            orderBy: {
                id: "asc",
            },
        });

        return {
            votes,
            day,
            settings,
            error: false,
        };
    } catch (e: unknown) {
        return {
            votes: [],
            day: "1",
            settings: null,
            error: true,
        };
    }
};

const Page = async ({
    searchParams,
}: {
    searchParams: {
        day: string;
    };
}) => {
    const { votes, day, settings, error } = await fetchData({ param: searchParams.day });

    return (
        <section className="section-vote-admin">
            <div className="heading">
                <h1 className="title">Vote Settings</h1>
                <p className="subtitle">You can manage the vote section here. You can add, edit, and delete votes.</p>
                <p className="subtitle">
                    <strong>Current Day:</strong> {day}
                </p>
            </div>
            <div className="flex gap-2 mt-2">
                {searchParams.day !== settings?.value && (
                    <Link href={`/admin/votes?day=${settings?.value}`} className="btn px-3 py-1">
                        Today
                    </Link>
                )}
                {+searchParams.day > 1 && (
                    <Link href={`/admin/votes?day=${+day - 1}`} className="btn px-3 py-1">
                        Previous Day
                    </Link>
                )}
                <Link href={`/admin/votes?day=${+day + 1}`} className="btn px-3 py-1">
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
