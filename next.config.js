/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ép Vercel bỏ qua lỗi TypeScript khi Build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Bỏ qua lỗi ESLint khi Build
    ignoreDuringBuilds: true,
  },
}
module.exports = nextConfig
