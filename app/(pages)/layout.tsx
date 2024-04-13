import type { Metadata } from "next";
import "../assets/scss/layout.scss";
import Navbar from "../components/Navbar/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
    title: "Basevatar",
    description: "Basevatar",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>{children}</main>
            <ToastContainer />
        </>
    );
}
