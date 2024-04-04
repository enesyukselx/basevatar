"use client";

import { ReactNode } from "react";
import { config, projectId } from "../config/wagmi";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";
// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
    wagmiConfig: config,
    featuredWalletIds: ["c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96"],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    themeMode: "dark", // Optional - defaults to your Cloud configuration
    allWallets: "HIDE",
});

export default function Web3ModalProvider({ children, initialState }: { children: ReactNode; initialState?: State }) {
    return (
        <WagmiProvider config={config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    );
}
