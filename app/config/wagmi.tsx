import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { base } from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = "6e994cc9fdc864e410a7ca3dc0d69550";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
    name: "Basevatar",
    description: "Basevatar",
    url: "https://basevatar.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [base] as const;
export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage,
    }),
});
