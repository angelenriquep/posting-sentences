.PHONY: load-env install-packages install-deps

install-packages:
	. ./install-packages.sh

install-deps:
	npm install

load-env:
	@set -a && source .env && $(MAKECMDGOALS)