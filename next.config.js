// @ts-check
const { i18n } = require("./next-i18next.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ACCEPT_BTCO_API: process.env.ACCEPT_BTCO_API || "",
    API_PUBLIC_URL: process.env.API_PUBLIC_URL || "",
    JWT_TOKEN: process.env.JWT_TOKEN || "",
  },
};

module.exports = nextConfig;
