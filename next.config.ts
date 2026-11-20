import { dataset, projectId } from "@/sanity/env";
import type { NextConfig } from "next";
import { productionOrigin } from "./src/app/site";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async redirects() {
    return ["eliaslarsson.dev", "myportfolio-gilt-seven.vercel.app"].map(
      (value) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value }],
        destination: `${productionOrigin}/:path*`,
        permanent: true,
      }),
    );
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${projectId}/${dataset}/**`,
      },
    ],
  },
};

export default nextConfig;
