SHELL := /bin/bash

all: install

dev:
	docker compose \
	 	-f ./deployments/compose.development.yml \
	 	--env-file .env.dev \
		up \
		--build

format:
	@echo ">>> formatting javascript files"
	pnpm format
	@echo ">>> formatting python files"
	python3 -m venv .venv
	source .venv/bin/activate && \
		python3 -m isort . && \
		python3 -m black .

install:
	${MAKE} install_javascript_deps
	${MAKE} install_python_dev_deps
	${MAKE} install_python_deps

install_javascript_deps:
	@echo ">>> installing javascript dependencies"
	pnpm install

install_python_dev_deps:
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

lint_python:
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
	docker compose \
		-f ./deployments/compose.yml \
		--env-file .env \
		up \
		--build

test:
	${MAKE} test_unit

test_python_unit:
	@echo ">>> running python unit tests"
	python3 -m venv .venv
	source .venv/bin/activate && \
		python3 -m pytest -vv -s --log-cli-level=ERROR api

test_unit:
	${MAKE} test_python_unit
