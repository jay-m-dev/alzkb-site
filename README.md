# Alzheimer's Knowledgebase (AlzKB) Site
This repository contains the following components:

- **Website**: site with some general information about this project. The source code for this website is found in the `app/` directory

- **Neo4j**: used to store the graph database for this Knowledgebase.

- **Nginx**: used as a reverse proxy for the Website and the Neo4j Browser

- **Configuration files**
  - Docker Compose Files
    - The files in the `compose/` directory are `.yml` files which contain definitions for building a docker image.  
    - To build and run these serives see the **Installation** section below.

- **Environmental Variables**
  - The files in the `config/` directory contain environmental variables used by the different docker services. You will find the following files:
    - **common.env**: contains variables which are shared among all services
    - **neo4j.env**: contains variables which are specific to the neo4j service
    - **nginx.env**: contains variables which are specific to the nginx service
    - **node.env**: contains variables which are specific to the node service

# Installation
## Install Docker
**Docker** and **docker comopse** are required to build and run all services. You may choose to install them with the provided script `install-docker.sh` or by visiting the Docker website and following the steps manually:
- **Docker**
  - Most recent stable release
    - [Official Docker Website Getting Started](https://docs.docker.com/engine/getstarted/step_one/)
- **docker compose**
    - This can be installed by running `apt install docker-compose-plugin`

## Building the Services
`build.sh` is provided for your convenience to build the different services. The services can all be built independently of each other.

### 1. Website (Optional)
Skip this step if you will not be deploying this website.    
- **Run** `./build.sh app` to build a nodejs container with the AlzKB Website.
  
### 2. neo4j-admin
- **Run** `./build.sh neo4j-admin` to build a neo4j/neo4j-admin docker image which will be used to load a neo4j dump file (see the **Running Services** section below).

  - **NOTE:**
    - **neo4j-admin.yml** defines **volumes** which are used to write the data onto the host machine where this project is being deployed. These must be the same **volumes** as defined in **neo4j.yml**.
  
### 3. neo4j
- **Run** `./build.sh neo4j` to build a neo4j docker image.

  - **NOTE:**
    - **neo4j.yml** defines **volumes** which are used to write the data onto the host machine where this project is being deployed.
  
### 4. nginx
- **Run** `./build.sh nginx` to build an nginx docker image that will be configured to act as a reverse proxy for both the **Website** and the **Neo4j Browser**.

  - **NOTE:**
    - If you are not deploying the **Website** for this project, **nginx** is not required to run the **Neo4j Browser**. The **Neo4j Browser** can still be accessed through the default port 7474. But using **nginx** will allow you to navigate to the browser without entering the port on the URL.
  
## Running the Services
`run.sh` is provided for your convenience to run the different services after they have been built.

If you inspect **run.sh** you will notice that the services will be launched in **detached** mode (`-d` flag)

Once a service is up an running, you can see its status by running `docker ps`

TODO: insert image here.

To view any logs from the running container, you may run `docker logs container_name`

### 1. Website (Optional)
Skip this step if you did not build the container for the Website.  

- **Run** `./run.sh app` to run the nodejs container with the AlzKB Website.

### 2. neo4j-admin
This utility will load a dump file into the Neo4j database.  
- Download the alzkb dump file [here](https://upenn.box.com/s/dalcofa8i7rkkc2h2n6bfg8nvmwi83pq)  
- Place the dump file in the **neo4j/dump/** directory. The file must be named **alzkb.dump** (rename the file if necessary)
- Ensure that the **neo4j** container is ***not*** running! Otherwise the data will not be loaded.
  - run `docker ps` to list running containers
  - run `docker stop my_container` (replace **my_container** with the name of the neo4j container)
- **Run** `./run.sh neo4j-admin` to load the **neo4j/dump/alzkb.dump** file

  - **NOTES:**
    - **neo4j-admin.yml** defines [named volumes]() to store the data on the host machine where this project is being deployed. These must be the same **volumes** defined in **neo4j.yml**.
    - Run this step whenever you need to load a new dump file. (Remember to rename the file to **alzkb.dump** if necessary)

### 3. neo4j
- ***Run*** `./run.sh neo4j` to run the neo4j docker container.  
- Navigate to the Neo4j Browser at http://browser_url:7474 (replace **browser_url** with the value defined in **config/nginx.env MYNGINX_NEO4J_BROWSER**, see the **Configuration** section below for more details.)

  - **NOTE:**
    - **neo4j.yml** defines [named volumes](https://docs.docker.com/storage/volumes/) to store the data on the host machine where this project is being deployed.

### 4. nginx
- **Run** `./run.sh nginx` to run the nginx docker container.  
- Navigate to http://host_url (replace **host_url** with one of the following values)
  - If the **Website** was deployed, replace **host_url** with the value defined in **config/common.env ALZKB_HOST**, see the **Configuration** section below for more details.
  - If the **Website** was not deployed, replace **host_url** with the value defined in **config/nginx.env MYNGINX_NEO4J_BROWSER**, see the **Configuration** section below for more details.

## Configuration
The **config/** directory contains the following files with environmental variables:
### common.env
- `ALZKB_HOST` IP address of the host server where the **Website** is deployed  
- `ALZKB_APP_SERVICE` Name of the docker service where the **Website** will run.  
- ``ALZKB_PORT`` Port used by ExpressJS to serve the **Website**, Nginx will forward requests to `ALZKB_HOST` to this port.
- `ALZKB_DATA_ROOT` Directory where the data from **Neo4J** will be stored on the host machine (data, logs, etc.)

### neo4j.env
- Contains variables used by the Neo4j service.
  - For example, `NEO4J_dbms_security_auth__enabled=false` tells the server to allow connections without user credentials.  
- For more information about these varibales, see the Neo4j [documenation](neo4j.com/docs/operations-manual/current/configuration/neo4j-conf/).
  - NOTE that these variables are prefixed with `NEO4J_` and use underscores **_** instead of peridods. **One** underscore **_** is used instead of periods, and **two** underscores **__** are used instead of underscores.
    - Example, `NEO4J_dbms_security_auth__enabled`translates to `dbms.security.auth_enabled` in the Neo4j.conf file

### nginx.env
- `MYNGINX_NEO4J_BROWSER` URL used for the Neo4J Browser, which is different from from the URL for the **Website** (`ALZKB_HOST` in **config/common.env**.)

### node.env
- `NODE_ENV` If set to **production**, the `npm install` command installs dependencies without including any devDependancies as documented [here](l).
