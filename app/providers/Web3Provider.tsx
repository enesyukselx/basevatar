"use client";
import { useRouter } from "next/navigation";

import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig, SIWEProvider } from "connectkit";
import { SiweMessage } from "siwe";

const config = createConfig(
    getDefaultConfig({
        chains: [baseSepolia],
        transports: {
            [baseSepolia.id]: http(baseSepolia.rpcUrls.default.http[0]),
        },
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
        ssr: true,
        appName: "Basevatar",
        appDescription: "Your App Description",
        appUrl: "https://basevatar.com", // your app's url
        appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    })
);

const queryClient = new QueryClient();

const SiweProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const siweConfig = {
        getNonce: async () => {
            const res = await fetch(`/siwe`, { method: "PUT" });
            if (!res.ok) throw new Error("Failed to fetch SIWE nonce");

            return res.text();
        },
        createMessage: ({ nonce, address, chainId }: { nonce: string; address: string; chainId: number }) => {
            return new SiweMessage({
                nonce,
                chainId,
                address,
                version: "1",
                uri: window.location.origin,
                domain: window.location.host,
                statement: "Sign In With Ethereum to prove you control this wallet.",
            }).prepareMessage();
        },
        verifyMessage: ({ message, signature }: { message: string; signature: string }) => {
            return fetch(`/siwe`, {
                method: "POST",
                body: JSON.stringify({ message, signature }),
                headers: { "Content-Type": "application/json" },
            }).then((res) => res.ok);
        },
        getSession: async () => {
            const res = await fetch(`/siwe`);
            if (!res.ok) throw new Error("Failed to fetch SIWE session");

            const { address, chainId } = await res.json();
            return address && chainId ? { address, chainId } : null;
        },
        signOut: () => fetch(`/siwe`, { method: "DELETE" }).then((res) => res.ok),
    };

    return (
        <SIWEProvider
            // Optional parameters
            enabled={true} // defaults true
            nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
            sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
            signOutOnDisconnect={true} // defaults true
            signOutOnAccountChange={true} // defaults true
            signOutOnNetworkChange={true} // defaults true
            {...siweConfig}
            onSignIn={() => router.refresh()}
            onSignOut={() => router.refresh()}
        >
            {children}
        </SIWEProvider>
    );
};

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <SiweProvider>
                    <ConnectKitProvider>{children}</ConnectKitProvider>
                </SiweProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};
