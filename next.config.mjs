const { NEXT_PUBLIC_VERCEL_ENV } = process.env;
/**
 * @type {import('next').NextConfig}
 */
const nextConfig =
  NEXT_PUBLIC_VERCEL_ENV !== "production"
    ? {
        i18n: {
          locales: ["en-US"],
          defaultLocale: "en-US",
        },
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
      }
    : {
        i18n: {
          locales: ["en-US"],
          defaultLocale: "en-US",
        },
        reactStrictMode: true,
        images: {
          domains: ["s3.us-east-2.amazonaws.com"],
        },
        env: {
          RELAY_API_ENDPOINT: "https://api.brullah.com",
          BRULLAH_URL: "https://www.brullah.com",
          CHECKERS_URL: "https://checkers.brullah.com",
          PAYPAL_CLIENT_ID:
            "ASf-GFd_frMTNgapii1Gi7jUCfCM9Kq5JgI2tOre68fvONTpJRYldWtBSq_k5w3EG33zZINrQAsMo9V8",
          YOUTUBE: "https://www.youtube.com/@kibeandrew",
        },
      };

export default nextConfig;
