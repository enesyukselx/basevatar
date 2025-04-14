import VoteForm from "../../components/Votes/VoteForm";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Page = async (props: { searchParams: SearchParams }) => {
    //
    const searchParams = await props.searchParams;
    const day = searchParams.day as string;

    return (
        <section>
            <div className="heading">
                <h1 className="title">Create Vote</h1>
            </div>
            <VoteForm day={day ?? "1"} />
        </section>
    );
};

export default Page;
