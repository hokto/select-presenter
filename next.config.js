/** @type {import('next').NextConfig} */
const nextConfig = {
  // Github Pages用の設定
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Docker用のstandalone出力（本番環境）
  experimental: {
    outputStandalone: true,
  },

  // 環境変数による設定切り替え
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
    trailingSlash: false,
  }),
};

module.exports = nextConfig;
