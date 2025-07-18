/** @type {import('next').NextConfig} */
const nextConfig = {
  // 環境変数による設定切り替え
  ...(process.env.NODE_ENV === 'production'
    ? {
        // Docker用のstandalone出力（本番環境）
        output: 'standalone',
        trailingSlash: false,
      }
    : {
        // Github Pages用の設定（開発環境）
        output: 'export',
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }),
};

module.exports = nextConfig;
