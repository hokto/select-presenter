# ベースイメージ
FROM node:18-alpine AS base

# 依存関係インストールステージ
FROM base AS deps
# パッケージマネージャーのキャッシュを無効化
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json package-lock.json* ./
RUN npm ci

# 開発環境用ステージ
FROM base AS dev
WORKDIR /app

# 依存関係をコピー
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json* ./

# 開発用のコマンドを設定
CMD ["npm", "run", "dev"]

# ビルドステージ（静的エクスポート用）
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
