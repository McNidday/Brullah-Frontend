/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => {
    return {
      "/": { page: "/home/home" },
      "/tournaments": { page: "/tournaments/tournaments" },
    };
  },
  env: {
    RELAY_API_ENDPOINT: "http://localhost:8080",
    RELAY_API_ENDPOINT_AUTH_TOKEN: "",
  },
};

module.exports = nextConfig;
