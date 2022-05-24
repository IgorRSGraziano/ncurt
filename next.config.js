/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/404",
        destination: "/not-found",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
