/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => {
    return {
      "/": { page: "/home/Home" },
      "/signup": { page: "/signup/Signup" },
      "/tournaments": { page: "/tournaments/Tournaments" },
    };
  },
  env: {
    RELAY_API_ENDPOINT: "http://localhost:8080",
    RELAY_API_ENDPOINT_AUTH_TOKEN: "",
  },
};

module.exports = nextConfig;
