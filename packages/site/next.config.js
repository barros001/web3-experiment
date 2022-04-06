/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'common', 'modules'],
  },
};

module.exports = nextConfig;
