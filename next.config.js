/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: isProd ? '/select-presenter' : '',
  assetPrefix: isProd ? '/select-presenter/' : '',
};
