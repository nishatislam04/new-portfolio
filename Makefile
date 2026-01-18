.PHONY: help dev build start lint lint-fix type-check db-seed db-push db-migrate db-studio docker-up docker-down docker-clean

# Default target
help:
	@echo "Available commands:"
	@echo "  dev         - Start development server (Docker + Next.js + Prisma)"
	@echo "  build       - Build for production"
	@echo "  start       - Start production server"
	@echo "  lint        - Run Biome linter"
	@echo "  lint-fix    - Fix linting issues with Biome"
	@echo "  type-check  - Run TypeScript type checking"
	@echo "  db-seed     - Seed database with initial data"
	@echo "  db-push     - Push schema to database"
	@echo "  db-migrate  - Run database migrations"
	@echo "  db-studio   - Open Prisma Studio (standalone)"
	@echo "  docker-up   - Start Docker services (PostgreSQL + Prisma Studio)"
	@echo "  docker-down - Stop Docker services"
	@echo "  docker-clean- Clean Docker volumes and containers"

# Development
dev: docker-up
	bun run dev

# Production
build:
	npm run build

start:
	npm run start

# Code quality
lint:
	npm run lint

lint-fix:
	npm run lint:fix

type-check:
	npm run type-check

# Database operations
generate:
	bunx --bun prisma generate
	
seed:
	bun run db:seed

push:
	bunx --bun prisma db push --force-reset

migrate:
	bunx --bun prisma migrate dev

reset:
	bunx --bun prisma migrate reset

studio:
	bunx --bun prisma studio

up:
	@echo "Starting Docker services..."
	docker-compose up -d

# Docker operations
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-clean:
	docker-compose down -v
	docker system prune -f

next-upgrade:
	npm i next@canary
