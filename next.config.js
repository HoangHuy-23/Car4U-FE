// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN || "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
