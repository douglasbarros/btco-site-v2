// @ts-check
const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // @ts-ignore
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    // @ts-ignore
    JWT_TOKEN: process.env.JWT_TOKEN,
    // @ts-ignore
    ACCEPT_BTCO_API: process.env.ACCEPT_BTCO_API,
  },
  images: {
    domains: ["localhost", "res.cloudinary.com"],
    imageSizes: [24, 64, 300],
  },
};

module.exports = nextConfig;
