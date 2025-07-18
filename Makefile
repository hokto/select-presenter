# ビルド
build-dev:
	docker compose build app-dev

build-prod:
	docker compose build app-prod

build-all:
	docker compose build

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

up-prod:
	docker compose up -d app-prod

up-all:
	docker compose up -d

# 停止
down-all:
	docker compose down

down-dev:
	docker compose down app-dev

down-prod:
	docker compose down app-prod

# ログ表示
logs-dev:
	docker compose logs -f app-dev

logs-prod:
	docker compose logs -f app-prod

logs-all:
	docker compose logs -f

# コンテナ操作
shell-dev:
	docker compose exec app-dev sh

shell-prod:
	docker compose exec app-prod sh

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

restart-prod:
	docker compose restart app-prod

restart-all:
	docker compose restart

# 開発用ショートカット
dev: build-dev up-dev logs-dev

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
	@echo "  build-prod: Build the production environment"
	@echo "  build-all: Build all environments"
	@echo "  update-deps: Update dependencies in development container"
	@echo "  clean-install: Clean install dependencies in development container"
	@echo "  up-dev: Start the development environment"
	@echo "  up-prod: Start the production environment"
	@echo "  up-all: Start all environments"
	@echo "  down-all: Stop all environments"
	@echo "  down-dev: Stop the development environment"
	@echo "  down-prod: Stop the production environment"
	@echo "  logs-dev: Show development logs"
	@echo "  logs-prod: Show production logs"
	@echo "  logs-all: Show all logs"
	@echo "  shell-dev: Open shell in development container"
	@echo "  shell-prod: Open shell in production container"
	@echo "  status: Show container status"
	@echo "  clean: Clean up containers and images"
	@echo "  clean-all: Clean up everything (including volumes)"
	@echo "  restart-dev: Restart development container"
	@echo "  restart-prod: Restart production container"
	@echo "  restart-all: Restart all containers"
	@echo "  dev: Build, start, and show logs for development (all-in-one)"
	@echo "  lint: Run ESLint"
	@echo "  lint-fix: Fix ESLint issues"
	@echo "  format: Format code with Prettier"
	@echo "  format-check: Check code formatting"
	@echo "  type-check: Run TypeScript type checking"
	@echo "  check: Run all code quality checks"
	@echo "  fix: Fix all code quality issues"