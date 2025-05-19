const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Add other custom config options if needed
};

module.exports = withPWA(nextConfig);


