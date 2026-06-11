<div align="center">

[![License: CC0-1.0](https://img.shields.io/github/license/kieranroneill/moody-376-assistant)][license]

</div>

<h1 align="center">
  Moody 376 Assistant
</h1>

<p align="center">
  The Moody 376 Assistant is an onboard knowledge and maintenance copilot that centralizes technical documents, service logs, and operational notes for the vessel.
</p>

---

### Table of contents

- [1. Overview](#-1-overview)
  - [1.1. Project structure](#11-project-structure)
- [2. Usage](#-2-usage)
  - [2.1. With Docker (Recommended)](#21-with-docker-recommended)
    - [2.1.1. Requirements](#211-requirements)
    - [2.1.2. Start Docker](#212-start-docker)
  - [2.2. Manual](#22-manual)
    - [2.2.1. Requirements](#221-requirements)
    - [2.2.2. Setup](#222-setup)
    - [2.2.3. Start the API](#223-start-the-api)
- [3. Appendix](#-3-appendix)
  - [3.1. Useful commands](#31-useful-commands)
- [4. How to contribute](#-4-how-to-contribute)
- [5. License](#-5-license)

## 🔭 1. Overview

### 1.1. Project structure

```text
.
├─ api/
│   ├── chat/
│   │   └── ...
│   ├── main.py                             <-- API entrypoint
│   └── ...
├─ build/
│   ├── package/                            <-- Docker image files
│   │   ├── <service-name>/
│   │   │   ├── Dockerfile
│   │   │   └── Dockerfile.development
│   │   └── ...
│   └── ...
├─ deployments/                             <-- Container orchestration configurations
│   ├── compose.yml
│   └── compose.development.yml
├─ web/
│   ├── main.ts                             <-- Web UI entrypoint
│   └── ...
├── dev-requirements.txt                    <-- Python development dependencies
├── LICENSE                                 <-- Project license
├── Makefile                                <-- Make commands
├── pip-requirements.txt                    <-- Defines the pip version
├── pyproject.toml                          <-- Python project configuration file
├── README.md
├── requirements.txt                        <-- Python dependencies
└── ...
```

<sup>[Back to top ^][table-of-contents]</sup>

## 🪄 2. Usage

### 2.1. With Docker (Recommended)

#### 2.1.1. Requirements

- [Docker](https://docs.docker.com/engine/install/)

<sup>[Back to top ^][table-of-contents]</sup>

#### 2.1.2. Start Docker

1. Using Docker compose, you can run the orchestration file using:

```bash
$ make start
```

<sup>[Back to top ^][table-of-contents]</sup>

### 2.2. Manual

#### 2.2.1. Requirements

- [Python v3.11+](https://www.python.org/downloads/)
- [Make](https://www.gnu.org/software/make/)

<sup>[Back to top ^][table-of-contents]</sup>

#### 2.2.2. Setup

Install the dependencies and tools:

```bash
$ make install
```

<sup>[Back to top ^][table-of-contents]</sup>

#### 2.2.3. Start the API

Start the API (this will use a Python virtual environment):

```bash
$ make run_api
```

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 3. Appendix

### 3.1. Useful commands

| Command             | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `make dev`          | Runs the platform in development mode via Docker.                   |
| `make format`       | Formats soruce code files.                                          |
| `make install`      | Installs all the dependencies - including development dependencies. |
| `make install_deps` | Installs each application's dependencies.                           |
| `make install_dev`  | Installs the development dependencies.                              |
| `make lint`         | Lints soruce code files.                                            |
| `make run_api`      | Starts the API in the Python virtual environment.                   |
| `make start`        | Runs the platform via Docker.                                       |

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 4. How to contribute

Please read the [**contributing guide**](https://github.com/kieranroneill/moody-376-assistant/blob/main/CONTRIBUTING.md) to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

## 📄 5. License

Please refer to the [LICENSE][license] file.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->

[license]: https://github.com/kieranroneill/moody-376-assistant/blob/main/LICENSE
[table-of-contents]: #table-of-contents
