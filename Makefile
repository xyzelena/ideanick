.PHONY: install dev clean

clean:
	rm -rf node_modules
	rm -rf webapp/node_modules
	rm -rf backend/node_modules
	rm -rf backend/dist
	rm -rf webapp/dist
	rm -rf webapp/build

install:
	pnpm install

types:
	cd backend && pnpm types
	cd webapp && pnpm types

prettify:
	cd backend && pnpm prettify
	cd webapp && pnpm prettify

dev:
	cd backend && pnpm dev & \
	cd webapp && pnpm dev

build:
	cd backend && pnpm build
	cd webapp && pnpm build
