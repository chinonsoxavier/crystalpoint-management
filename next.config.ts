/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This forces ALL internal fetches (prefetch, router, middleware) to send cookies
    credentialsInclude: true,
  },

  // OR in Next.js 14.2+ / 15+, use the new stable flag:
  // fetch: {
  //   credentials: "include",
  // },
};

module.exports = nextConfig;
