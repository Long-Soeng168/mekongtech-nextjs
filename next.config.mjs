/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
      },
      {
        hostname: "mekongtech.kampu.solutions",
      },
    ],
  },
};

export default nextConfig;
