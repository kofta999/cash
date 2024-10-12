/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "qtwyboneyfrsxncuijof.supabase.co",
        protocol: "https",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
