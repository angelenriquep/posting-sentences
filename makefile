.PHONY: all load-env install-packages install-deps

all: install-packages install-deps

install-packages:
	. ./install-packages.sh

install-deps:
	npm install

load-env:
	source .env