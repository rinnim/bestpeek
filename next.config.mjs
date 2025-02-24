/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http", 
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "www.techlandbd.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "www.startech.com.bd",
      },
      {
        protocol: "https",
        hostname: "www.ryans.com",
      },
      {
        protocol: "https",
        hostname: "ryans.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "www.binarylogic.com.bd",
      },
      {
        protocol: "https",
        hostname: "www.skyland.com.bd",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true 
  },
};

export default nextConfig;
