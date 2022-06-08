#!/bin/bash

docker image prune

if [[ $1 == "prod" ]]; then
  echo "copying prod config files"
  cp app/config/prod.env app/config/alzkb.env
  cp nginx/alzkb.prod.conf nginx/alzkb.conf
else
  echo "copying dev config files"
  cp app/config/dev.env app/config/alzkb.env
  cp nginx/alzkb.dev.conf nginx/alzkb.conf
fi

docker compose -f ./docker-compose.yml up -d --build
