#!/bin/bash

if [[ $1 == "prod" ]]; then
  echo "prod"
  # docker compose -f ./docker-compose.yml up -d
else
  echo "not prod"
  # docker compose -f ./docker-compose-production.yml up -d
fi