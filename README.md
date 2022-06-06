# Alzheimer's Knowledgebase (AlzKB) Site

## Installation

### Requirements
  - Docker
    - Most recent stable release, minimum version is 17.06.0
      - [Official Docker Website Getting Started](https://docs.docker.com/engine/getstarted/step_one/)
      - [Official Docker Installation for Windows](https://docs.docker.com/docker-for-windows/install/)
  - docker compose
      - can be installed with apt install docker-compose-plugin

### Starting and Stopping
To start, run build.sh (no arguments for a development environment, or argument "prod" for production):
  - Development
    - `./build.sh`
  - Production
    - `./build.sh prod`

Alternatively, these commands can also be run:
  - Development
    - `docker compose -f ./docker-compose.yml up -d --build`
  - Production
    - `docker compose -f ./docker-compose-production.yml up -d --build`

To stop and remove the docker containers run:
  - `docker compose down`
