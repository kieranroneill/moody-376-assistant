SHELL := /bin/bash

all: install

dev:
	docker compose -f ./deployment/compose.development.yml up --build

format:
	@echo ">>> formatting python files"
	python3 -m venv .venv
	source .venv/bin/activate && \
		isort . && \
		black .

install:
	${MAKE} install_dev
	${MAKE} install_deps

install_dev:
	@echo ">>> installing development dependencies"
	python3 -m venv .venv
	source .venv/bin/activate && \
		pip install -r pip-requirements.txt && \
		pip install -r dev-requirements.txt && \
		deactivate

install_deps:
	@echo ">>> installing dependencies"
	python3 -m venv .venv
	source .venv/bin/activate && \
		pip install -r requirements.txt && \
		deactivate

lint:
	@echo ">>> linting python files"
	python3 -m venv .venv
	source .venv/bin/activate && \
		flake8 .

run_api:
	@echo ">>> running api"
	python3 -m venv .venv
	source .venv/bin/activate && \
		python3 api/main.py
