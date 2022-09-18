/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  exportPathMap: () => {
    return {
      "/": { page: "/home/Home", query: { affiliate: "" } },
      "/howto": { page: "/howto/HowTo" },
      "/play": { page: "/play/Play" },
      "/affiliate": { page: "/affiliate/Affiliate" },
      "/user/signup": { page: "/user/signup/Signup" },
      "/user/login": { page: "/user/login/Login" },
      "/user/forgot": { page: "/user/forgot/Forgot", query: { token: "" } },
      "/user/verify": {
        page: "/user/verify/VerifyAccount",
        query: { token: "" },
      },
      "/user/update": { page: "/user/update/UpdateUser" },
      "/dashboard": { page: "/dashboard/Dashboard" },
      "/tournament/mytournaments": {
        page: "/tournament/mytournaments/MyTournaments",
        query: { joinTournId: "", joinTournSecret: "" },
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
    BRULLAH_URL: "http://localhost:3000",
    CHECKERS_URL: "http://localhost:3002",
    PAYPAL_CLIENT_ID:
      "AR7mepWYpche1Gnhv-516V7jixWwrvr8NnQ7wdEgo7mIbVa8x0Mb8TCdXRXopyrMZLy8vnrPhQRH64rW",
    YOUTUBE: "https://www.youtube.com/channel/UCfMxzWvxGN45lWiFQODymLA",
  },
};

module.exports = nextConfig;
