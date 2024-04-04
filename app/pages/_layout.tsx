import type { MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";
import Navbar from "~/components/Navbar/Navbar";
import "../assets/scss/layout.scss";
//
import Web3ModalProvider from "../context/wagmi";
import { cookieToInitialState } from "wagmi";
import { config } from "../config/wagmi";
//

import { json, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
    if (!request.headers) return;
    const cookieHeader = request.headers.get("cookie");
    return json({ cookieHeader });
}

export const meta: MetaFunction = () => {
    return [{ title: "Basevatar" }, { name: "description", content: "Welcome to Basevatar!" }];
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
        </>
    );
};

const LayoutWithOutlet = () => {
    const { cookieHeader } = useLoaderData<typeof loader>();
    const initialState = cookieToInitialState(config, cookieHeader);

    return (
        <Web3ModalProvider initialState={initialState}>
            <Layout>
                <Outlet />
            </Layout>
        </Web3ModalProvider>
    );
};

export default LayoutWithOutlet;
