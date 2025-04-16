/** @type {import('next').NextConfig} */
const nextConfig = {
    //reactStrictMode: false,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
    rewrites: async () => {
        return [
            {
                source: "/images/:path*",
                destination: `https://${process.env.AWS_S3_URL}/images/:path*`
            },
            {
                source: "/outputs/:path*",
                destination: `https://${process.env.AWS_S3_URL}/outputs/:path*`
            }
        ];
    },
};

export default nextConfig;
