# Alzheimer's Knowledgebase (AlzKB) Site

## Installation

### Requirements
  - Docker
    - Most recent stable release, minimum version is 17.06.0
      - [Official Docker Website Getting Started](https://docs.docker.com/engine/getstarted/step_one/)
      - [Official Docker Installation for Windows](https://docs.docker.com/docker-for-windows/install/)
  - docker compose
      - can be installed with apt install `docker-compose-plugin`

### Building and Starting
To start, run build.sh (no arguments for a development environment, or argument "prod" for production):
  - Development
    - `./build.sh dev`
  - Production
    - `./build.sh prod`

### Docker Hub

#### Requirements
Production images are available on [Docker Hub](hub.docker.com)
  - moorlab/alzkb_site
  - moorlab/alzkb_nginx

This GitHub repository is still needed to deploy the images using `deploy.sh` and `docker-compose.yml`

##### Deployment
Run this shell script (make sure that this repo has been cloned into the VM)
  - `./deploy.sh`````

### Stopping
To stop and remove the docker containers run the following command (this works whether the running images were built or using the `build.sh` or deployed from Docker Hub):
  - `docker compose down`
