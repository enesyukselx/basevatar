import { prisma } from "@/app/lib/db";
import Link from "next/link";
import Votes from "../components/Votes/Votes";

const Page = async ({
    searchParams,
}: {
    searchParams: {
        day: string;
    };
}) => {
    //
    const settings = await prisma.settings.findFirst({
        where: {
            key: "day",
        },
    });

    let day = searchParams.day
        ? parseInt(searchParams.day) > 0
            ? searchParams.day
            : "1"
        : (settings?.value as string);

    const votes = await prisma.votes.findMany({
        where: {
            day: parseInt(day),
        },
        orderBy: {
            id: "asc",
        },
    });

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
            <Votes data={votes} />
            <Link href={`/admin/votes/create?day=${day}`} className="btn px-3 py-1">
                Create Vote
            </Link>
        </section>
    );
};

export default Page;
