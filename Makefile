.PHONY: install dev clean

install:
	pnpm install

dev:
	pnpm dev

types:
	pnpm types

lint:
	pnpm lint

stylelint:
	pnpm w stylelint --fix

stylecheck:
	pnpm w stylecheck

prettify:
	pnpm prettify

clean:
	rm -rf node_modules
	rm -rf webapp/node_modules
	rm -rf backend/node_modules
	rm -rf backend/dist
	rm -rf webapp/dist
	rm -rf webapp/build




