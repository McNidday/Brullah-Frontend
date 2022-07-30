/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => {
    return {
      "/": { page: "/home/Home" },
      "/signup": { page: "/signup/Signup" },
      "/login": { page: "/login/Login" },
      "/dashboard": { page: "/dashboard/Dashboard" },
      "/mytournaments": { page: "/mytournaments/MyTournaments" },
      "/tournaments": { page: "/tournaments/Tournaments" },
      "/createtournament": { page: "/createTournament/CreateTournament" },
      "/track": { page: "/trackTournament/TrackTournament", query: { id: "" } },
      "/track/recap": {
        page: "/trackTournament/RecapTournament",
        query: { id: "" },
      },
    };
  },
  images: {
    domains: ["localhost"],
  },
  env: {
    RELAY_API_ENDPOINT: "http://localhost:8080",
    CHECKERS_URL: "http://localhost:3002",
    PAYPAL_CLIENT_ID:
      "AR7mepWYpche1Gnhv-516V7jixWwrvr8NnQ7wdEgo7mIbVa8x0Mb8TCdXRXopyrMZLy8vnrPhQRH64rW",
  },
};

module.exports = nextConfig;
