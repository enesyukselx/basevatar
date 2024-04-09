import VoteForm from "../../components/Votes/VoteForm";

const Page = async ({
    searchParams,
}: {
    searchParams: {
        day: string;
    };
}) => {
    return (
        <section>
            <div className="heading">
                <h1 className="title">Create Vote</h1>
            </div>
            <VoteForm day={searchParams.day ?? "1"} />
        </section>
    );
};

export default Page;
