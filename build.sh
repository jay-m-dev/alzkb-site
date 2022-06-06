#!/bin/bash

if [[ $1 == "prod" ]]; then
  echo "building production"
  docker compose -f ./docker-compose-production.yml up -d --build
else
  echo "building development"
  docker compose -f ./docker-compose.yml up -d --build
fi