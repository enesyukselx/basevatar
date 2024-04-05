import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black text-white text-4xl flex flex-col justify-center items-center font-semibold">
            <div className="text-6xl">404</div>
            <div className="mt-4 text-3xl">Page Not Found</div>
            <Link
                href="/"
                className="mt-8 flex items-center border px-8 py-2 border-white rounded-full text-lg font-light hover:bg-white hover:text-black"
            >
                Go Home
                <svg className="inline-block w-6 h-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
};

export default NotFound;
