/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "basepaint.xyz",
                port: "",
            },
        ],
    },
};

export default nextConfig;
