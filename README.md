# Alzheimer's Knowledgebase (AlzKB) Site
This repository is comprised of the following components:

- **Website**: site with some general information about this project. The source code for this website is found in the `app` directory

- **Neo4j**: used to store the graph database for this Knowledgebase.

- **Nginx**: used as a reverse proxy for the Website and the Neo4j Browser

- **Configuration files**
  - Docker Compose Files
    - The files in the **compose** directory are `.yml` files which contain definitions for building a docker image.  

- **Environmental Variables**
  - The files in the **config** directory contain environmental variables used by the different docker services. You will find the following files:
    - **common.env**: contains variables which are shared among all services
    - **neo4j.env**: contains variables which are specific to the neo4j service
    - **node.env**: contains variables which are specific to the node service

# Installation
## Install Docker
- Automated Installation
  - Run `install-docker.sh` to install **Docker Engine**
- Manual Installation
  - Install either [**Docker Desktop**](https://www.docker.com/products/docker-desktop/) or [**Docker Engine**](https://docs.docker.com/engine/getstarted/step_one/) based on your needs.
  - [**Docker Compose**](https://docs.docker.com/compose/install/)
## Docker Images
### **1.** Build and run the Website (NodeJS) **[Optional]**
- Ensure that the variables set in **config/common.env** and **config/node.env** are correct based on where this project will be deployed.
- Run `./run.sh app`
### **2.** Load the data (dump file)
**Skip this step is the data has been previously loaded and there's no updates to the database.**
- Download the alzkb.dump file from [here](https://upennbox.com/s/dalcofa8i7rkkc2h2n6bfg8nvmwi83pq)   
  - Put this file in the **neo4j-admin/dump** directory and make sure it is called **alzkb.dump**
- Ensure that the neo4j image is **not running.** If it is running, it must be stopped, otherwise the data will not be loaded.
- Ensure that the **ALZKB_DATA_ROOT** variable is set to the desired path where the database will be stored
- Run `./run.sh neo4j-admin`
### **3.** Build and run neo4j
- Ensure that the **ALZKB_DATA_ROOT** variable is set to the desired path where the database will be stored. **This must be the same value that was used for neo4j-admin on the previous step.**
- Run `./run.sh neo4j`
### **4.** Build and run nginx
- Ensure that the **ALZKB_HOST** and **ALZKB_NEO4J_BROWSER** variables are set to correctly in **config/common.env**
- Run `./run.sh nginx`

## Configuration files
The **config/** directory contains the following files with environmental variables:
### common.env
- `ALZKB_HOST` IP address of the host server where the **Website** is deployed.
- `ALZKB_NEO4J_BROWSER` URL used for the Neo4J Browser, (different from `ALZKB_HOST`)
- `COMPOSE_PROJECT_NAME`, See the docker [documentation](https://docs.docker.com/compose/reference/envvars/).
- `ALZKB_APP_SERVICE` Name of the docker service where the **Website** will run. This value is used by **nginx** to forward requests to this service.
- `ALZKB_PORT` Port used by ExpressJS to serve the **Website**, Nginx will forward requests to `ALZKB_HOST` to this port.
- `ALZKB_DATA_ROOT` Directory where the data from **Neo4J** will be stored on the host machine (data, logs, etc.)

### neo4j.env
- Contains variables used by the Neo4j service.
  - For example, `NEO4J_dbms_security_auth__enabled=false` tells the server to allow connections without user credentials.  
- For more information about these varibales, see the Neo4j [documenation](neo4j.com/docs/operations-manual/current/configuration/neo4j-conf/).
  - NOTE that these variables are prefixed with `NEO4J_` and use underscores **_** instead of peridods. **One** underscore **_** is used instead of periods, and **two** underscores **__** are used instead of underscores.
    - Example, `NEO4J_dbms_security_auth__enabled`translates to `dbms.security.auth_enabled` in the Neo4j.conf file

### node.env
- `NODE_ENV` If set to **production**, the `npm install` command installs dependencies without including any devDependancies as documented [here](l).
