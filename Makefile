.PHONY: install dev clean

install:
	pnpm install

dev:
	cd backend && pnpm dev & \
	cd webapp && pnpm dev

clean:
	rm -rf node_modules
	rm -rf webapp/node_modules
	rm -rf backend/node_modules