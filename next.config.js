/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => {
    return {
      "/": { page: "/home/Home" },
      "/signup": { page: "/signup/Signup" },
      "/login": { page: "/login/Login" },
      "/tournaments": { page: "/tournaments/Tournaments" },
      "/createtournament": { page: "/createTournament/CreateTournament" },
    };
  },
  images: {
    domains: ["localhost"],
  },
  env: {
    RELAY_API_ENDPOINT: "http://localhost:8080",
    RELAY_API_ENDPOINT_AUTH_TOKEN: "",
  },
};

module.exports = nextConfig;
