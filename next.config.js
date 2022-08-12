/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => {
    return {
      "/": { page: "/home/Home" },
      "/play": { page: "/play/Play" },
      "/user/signup": { page: "/user/signup/Signup" },
      "/user/login": { page: "/user/login/Login" },
      "/user/update": { page: "/user/update/UpdateUser" },
      "/dashboard": { page: "/dashboard/Dashboard" },
      "/tournament/mytournaments": {
        page: "/tournament/mytournaments/MyTournaments",
      },
      "/tournament/tournaments": {
        page: "/tournament/tournaments/Tournaments",
      },
      "/tournament/createtournament": {
        page: "/tournament/createTournament/CreateTournament",
      },
      "/tournament/track": {
        page: "/tournament/trackTournament/TrackTournament",
        query: { id: "" },
      },
      "/tournament/track/recap": {
        page: "/tournament/trackTournament/RecapTournament",
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
