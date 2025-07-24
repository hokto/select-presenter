# ビルド
build-dev:
	docker compose build app-dev

# 依存関係の更新
update-deps:
	docker compose exec app-dev npm install

# 依存関係のクリーンインストール
clean-install:
	docker compose exec app-dev rm -rf node_modules package-lock.json
	docker compose exec app-dev npm install

# 起動
up-dev:
	docker compose up -d app-dev

# 停止
down-all:
	docker compose down

down-dev:
	docker compose down app-dev

# ログ表示
logs-dev:
	docker compose logs -f app-dev

logs-all:
	docker compose logs -f

# コンテナ操作
shell-dev:
	docker compose exec app-dev sh

# 状態確認
status:
	docker compose ps

# クリーンアップ
clean:
	docker compose down -v --remove-orphans
	docker system prune -f

clean-all:
	docker compose down -v --remove-orphans
	docker system prune -af
	docker volume prune -f

# 再起動
restart-dev:
	docker compose restart app-dev

# 開発用ショートカット
dev: build-dev up-dev logs-dev

# 静的エクスポート（GitHub Pages用）
export:
	npm run build && npm run export

# コード品質管理
lint:
	docker compose exec app-dev npm run lint

lint-fix:
	docker compose exec app-dev npm run lint:fix

format:
	docker compose exec app-dev npm run format

format-check:
	docker compose exec app-dev npm run format:check

type-check:
	docker compose exec app-dev npm run type-check

# コード品質チェック（一括実行）
check: lint format-check type-check

# コード品質修正（一括実行）
fix: lint-fix format

# ヘルプ
help:
	@echo "Usage: make <target>"
	@echo "Targets:"
	@echo "  build-dev: Build the development environment"
	@echo "  update-deps: Update dependencies in development container"
	@echo "  clean-install: Clean install dependencies in development container"
	@echo "  up-dev: Start the development environment"
	@echo "  down-all: Stop all environments"
	@echo "  down-dev: Stop the development environment"
	@echo "  logs-dev: Show development logs"
	@echo "  logs-all: Show all logs"
	@echo "  shell-dev: Open shell in development container"
	@echo "  status: Show container status"
	@echo "  clean: Clean up containers and images"
	@echo "  clean-all: Clean up everything (including volumes)"
	@echo "  restart-dev: Restart development container"
	@echo "  dev: Build, start, and show logs for development (all-in-one)"
	@echo "  export: Build and export static site for GitHub Pages"
	@echo "  lint: Run ESLint"
	@echo "  lint-fix: Fix ESLint issues"
	@echo "  format: Format code with Prettier"
	@echo "  format-check: Check code formatting"
	@echo "  type-check: Run TypeScript type checking"
	@echo "  check: Run all code quality checks"
	@echo "  fix: Fix all code quality issues"
