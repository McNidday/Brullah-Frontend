/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    RELAY_API_ENDPOINT: "http://localhost:8080",
    BRULLAH_URL: "http://localhost:3000/",
    CHECKERS_URL: "http://localhost:3002/",
    PAYPAL_CLIENT_ID:
      "AR7mepWYpche1Gnhv-516V7jixWwrvr8NnQ7wdEgo7mIbVa8x0Mb8TCdXRXopyrMZLy8vnrPhQRH64rW",
    YOUTUBE: "https://www.youtube.com/channel/UCfMxzWvxGN45lWiFQODymLA",
  },
};

module.exports = nextConfig;
