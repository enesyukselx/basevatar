import { http, createConfig } from "@wagmi/core";
import { base, baseSepolia } from "wagmi/chains";

export const config = createConfig({
    chains: [baseSepolia],
    transports: {
        [baseSepolia.id]: http(baseSepolia.rpcUrls.default.http[0]),
    },
});
