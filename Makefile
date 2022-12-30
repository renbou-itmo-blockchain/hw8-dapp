.build:
	cd frontend && npm run build

.PHONY: up
up: .build
	docker-compose up --build -d && \
	docker exec hardhat-node npx hardhat run --network localhost scripts/deploy.js

.PHONY: down
down:
	docker-compose down -v

.PHONY: logs
logs:
	docker-compose logs -f