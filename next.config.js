/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "qtwyboneyfrsxncuijof.supabase.co",
        protocol: "https",
        port: "",
      },
      {
        hostname: "foremanbrosinc.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
