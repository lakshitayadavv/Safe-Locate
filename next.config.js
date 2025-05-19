// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  // Your Next.js config here
});
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // other config options if you have any
}

module.exports = nextConfig

