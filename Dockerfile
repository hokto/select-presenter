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

# ビルドステージ
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ビルド実行
RUN npm run build

# 本番実行ステージ
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 静的ファイルをコピー
COPY --from=builder /app/public ./public

# Next.js standalone出力をコピー（最適化された本番環境）
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# デフォルトコマンド（docker-compose.ymlで上書きされる）
CMD ["npm", "start"] 