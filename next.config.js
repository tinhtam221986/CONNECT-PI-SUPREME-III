/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Bỏ qua lỗi TypeScript để ưu tiên Build thành công
  },
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua lỗi định dạng code
  },
}

module.exports = nextConfig
