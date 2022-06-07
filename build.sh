#!/bin/bash

docker image prune

if [[ $1 == "prod" ]]; then
  echo "copying prod.env file"
  cp app/config/prod.env app/config/alzkb.env
else
  echo "copying dev.env file"
  cp app/config/dev.env app/config/alzkb.env
fi

docker compose -f ./docker-compose.yml up -d --build
