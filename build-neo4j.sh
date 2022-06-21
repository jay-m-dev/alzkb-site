#!/bin/bash

docker compose --env-file ./config/.env.common -f neo4j.yml up --build
