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
	pnpm types

prettify:
	pnpm prettify

dev:
	pnpm dev

