# Alzheimer's Knowledgebase (AlzKB) Site
This repository contains the following components:

- Website
Website showing some general information about this project. The source code for this website is found in the `app/` directory

- Neo4j
Neo4j is used to store the graph database for this Knowledgebase.

- Nginx
Nginx is used as a reverse proxy for the Website and the Neo4j Browser

- Configuration files
  - Docker Compose Files
    - The files in the `compose/` directory are `.yml` files which contain definitions for building a docker image.  
    - To build and run these serives see the **Installation** section below.

- Environmental Variables
  - The configuration files in the `config/` directory contain environmental variables used by the different docker services. You will find the following files:
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
  This step is optional, if you will not be deploying this website, this step can be skipped.  
  Run `./build.sh app` to build a nodejs container with the AlzKB Website.

2. ### neo4j-admin
Run `./build.sh neo4j-admin` to build a neo4j/neo4j-admin docker image which will be used to load a neo4j dump file (see the **Running Services** section below).

- **NOTE:**
  - **neo4j-admin.yml** defines **volumes** which are used to write the data onto the host machine where this project is being deployed. These must be the same **volumes** as defined in **neo4j.yml**.

3. ### neo4j
Run `./build.sh neo4j` to build a neo4j docker image.

- **NOTE:**
  - **neo4j.yml** defines **volumes** which are used to write the data onto the host machine where this project is being deployed.

4. ### nginx
Run `./build.sh nginx` to build an nginx docker image that will be configured to act as a reverse proxy for both the **Website** and the **Neo4j Browser**.

- **NOTE:**
  - If you are not deploying the **Website** for this project, **nginx** is not required to run the **Neo4j Browser**. The **Neo4j Browser** can still be accessed through the default port 7474. But using **nginx** will allow you to navigate to the browser without entering the port on the URL.


## Running the Services
`run.sh` is provided for your convenience to run the different services after they have been built.

If you inspect **run.sh** you will notice that the services will be launched in **detached** mode (`-d` flag)

Once a service is up an running, you can see its status by running `docker ps`

TODO: insert image here.

To view any logs from the running container, you may run `docker logs container_name`

1. ### Website (Optional)
This step is optional, if you did not build the container for the Website, this step can be skipped.

Run `./run.sh app` to run the nodejs container with the AlzKB Website.

2. ### neo4j-admin
This step will use the **neo4j-admin** utility to load the alzkb dump file into the Neo4j database. The full database dump file can be downloaded [here](https://upenn.box.com/s/dalcofa8i7rkkc2h2n6bfg8nvmwi83pq)  
Once downloaded, place the dump file in the **neo4j/dump/** directory. The file must be named **alzkb.dump**

Run `./run.sh neo4j-admin` run the **neo4j-admin** image to load the **neo4j/dump/alzkb.dump** file (see the **Running Services** section below).

**IMPORTANT: The neo4j container MUST NOT be running when loading the dump file.**  
To check if neo4j is running, run `docker ps` to list the currenlty running docker containers  
If a neo4j container is running, it can be stoped by running `docker stop my_container` where **my_container** is either the name of the container or the container ID.

**Example:**
TODO: Insert image here

- **NOTES:**
  - **neo4j-admin.yml** defines **volumes** which are used to write the data onto the host machine where this project is being deployed. These must be the same **volumes** as defined in **neo4j.yml**.
  - This step needs to be run anytime you wish to load a new dump file. (Remember to rename the file to **alzkb.dump** if necessary)
  - If the current data has not changed, and you need to rebuild the **neo4j** service, there is no need to run this step again. **neo4j** can be rebuilt independently (assuming that the **volumes** definition has not changed in **compose/neo4j.yml**)

3. ### neo4j
Run `./run.sh neo4j` to run the neo4j docker container.  
If the container is running successfully, navigate to the Neo4j Browser at http://browser_url:7474 (change **browser_url** to whatever value is defined in **config/nginx.env MYNGINX_NEO4J_BROWSER**, see the **Configuration** section below for more details.)

- **NOTE:**
  - **neo4j.yml** defines **volumes** which are used to write the data onto the host machine where this project is being deployed.

4. ### nginx
Run `./run.sh nginx` to run the nginx docker container.  
If the container is running successfully, navigating to http://host_url (change **host_url** to whatever value is defined in **config/common.env ALZKB_HOST**, see the **Configuration** section below for more details.) will show the **Website** (if it was deployed)  

- **NOTES:** 
  - Using the value defined in **config/common.env ALZKB_HOST** will bring up the **Website**, if it was deployed.
  - Using the value defined in **config/nginx.env MYNGINX_NEO4J_BROWSER** will bring up the Neo4J Brower (i.e. no need to type port :7474)

## Configuration
The **config/** directory contains the following files with environmental variables:
### common.env
`ALZKB_HOST`
IP address of the server wher this website is being deployed  

`ALZKB_APP_SERVICE`
Name of the docker service where the **Website** will run.  

``ALZKB_PORT``
Port where the **Website** is being served by ExpressJS. This variable is used by the NodeJS app and the nginx container to forward requests.  

`ALZKB_DATA_ROOT`
Directory where the data from **Neo4J** will be saved (data, logs, etc.)

### neo4j.env
This file contains the environmental used by the Neo4j service. For example, `NEO4J_dbms_security_auth__enabled=false` tells the server to allow connections without user credentials.  
These variables are explained in the Neo4j documenation: [neo4j.conf](neo4j.com/docs/operations-manual/current/configuration/neo4j-conf/)

NOTE that the variables defined in **neo4j.env** are prefixed with `NEO4J_` and use underscores **_** instead of peridods. That is **one** underscore **_** is used instead of periods, and a **two** underscores **__** are used for underscores in the neo4j.conf file.  
For example, `NEO4J_dbms_security_auth__enabled````````` translates to the `dbms.security.auth_enabled` variable in the Neo4j documentation.

### nginx.env
`MYNGINX_NEO4J_BROWSER`
This variable is used as a different URL from `ALZKB_HOST` (in **common.env**) in the case that the Neo4j Browser is being served from another domain

### node.env
`NODE_ENV`
This is the environment that the NodeJS application runs on. When the value of this variable is set to **production**, the `npm install` command installs dependencies without including any devDependancies as documented [here](l).
