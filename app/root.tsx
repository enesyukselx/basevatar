import {
    isRouteErrorResponse,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError,
} from "@remix-run/react";

import "./assets/scss/tailwind.scss";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary() {
    let error = useRouteError();
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
            return (
                <div className="min-h-screen bg-black text-white text-4xl flex flex-col justify-center items-center font-semibold">
                    <div className="text-6xl">404</div>
                    <div className="mt-4 text-3xl">Page Not Found</div>
                    <Link
                        to="/"
                        className="mt-8 flex items-center border px-8 py-2 border-white rounded-full text-lg font-light hover:bg-white hover:text-black"
                        reloadDocument
                    >
                        Go Home
                        <svg
                            className="inline-block w-6 h-6 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            );
        }
        return <h1>Server Error!</h1>;
    }
    throw new Error("Invalid error format");
}
