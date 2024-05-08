import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mugit.site",
        port: "",
        // pathname: "/ko/**",
      },
    ],
  },
  output: "standalone",
};

export default withNextIntl(nextConfig);
