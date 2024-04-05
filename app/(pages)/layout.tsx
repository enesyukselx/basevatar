import type { Metadata } from "next";
import { headers } from "next/headers";
//
import Web3ModalProvider from "../context/wagmi";
import { cookieToInitialState } from "wagmi";
import { config } from "../config/wagmi";
//
import "../assets/scss/layout.scss";
import Navbar from "../components/Navbar/Navbar";

export const metadata: Metadata = {
    title: "Basevatar",
    description: "Basevatar",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(config, headers().get("cookie"));

    return (
        <Web3ModalProvider initialState={initialState}>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
        </Web3ModalProvider>
    );
}
