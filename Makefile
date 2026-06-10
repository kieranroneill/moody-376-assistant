SHELL := /bin/bash

all: install

dev:
	docker compose -f ./deployments/compose.development.yml up

format:
	@echo ">>> formatting javascript files"
	pnpm format
	@echo ">>> formatting python files"
	python3 -m venv .venv
	source .venv/bin/activate && \
		python3 -m isort . && \
		python3 -m black .

install:
	@echo ">>> installing javascript dependencies"
	pnpm install
	${MAKE} install_python_dev
	${MAKE} install_python_deps

install_python_dev:
	@echo ">>> installing python development dependencies"
	python3 -m venv .venv
	source .venv/bin/activate && \
		pip install -r pip-requirements.txt && \
		pip install -r dev-requirements.txt && \
		deactivate

install_python_deps:
	@echo ">>> installing python dependencies"
	python3 -m venv .venv
	source .venv/bin/activate && \
		pip install -r requirements.txt && \
		deactivate

lint:
	@echo ">>> linting python files"
	python3 -m venv .venv
	source .venv/bin/activate && \
		python3 -m flake8 .

run_api:
	@echo ">>> running api"
	python3 -m venv .venv
	source .venv/bin/activate && \
		python3 -m api.main

start:
	docker compose -f ./deployments/compose.yml up --build
