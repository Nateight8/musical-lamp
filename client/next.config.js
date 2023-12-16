const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "musical-lamb-local.s3.us-east-1.amazonaws.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
