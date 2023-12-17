/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        host: "links.papareact.com",
      },
    ],
  },
};

module.exports = nextConfig;
