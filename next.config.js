/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      // Google Books API
      {
        protocol: "http",
        hostname: "books.google.com",
        port: "",
      },
    ],
  },
};

export default config;
