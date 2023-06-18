.PHONY: install-packages install-deps load-env

install-packages:
	./install-packages.sh

install-deps:
	npm install

load-env:
	@set -a && source .env && $(MAKECMDGOALS)