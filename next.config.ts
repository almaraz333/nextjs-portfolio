import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Native/node-API packages used by the guestbook + visitor-counter store.
    serverExternalPackages: ["better-sqlite3", "pg"],
};

export default nextConfig;
