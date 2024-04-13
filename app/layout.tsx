import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import "./assets/scss/tailwind.scss";

export const metadata: Metadata = {
    title: "Basevatar",
    description: "Basevatar",
};
import { Web3Provider } from "@/app/providers/Web3Provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Web3Provider>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </Web3Provider>
    );
}
