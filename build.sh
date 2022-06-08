#!/bin/bash

if [[ $1 == "prod" ]] || [[ $1 == "dev" ]]; then
  echo "Building $1..."
else
  echo "USAGE: ./build.sh [OPTION] [ARG]"
  echo "OPTIONS:"
  echo " prod    - production environment"
  echo " dev     - development environment"
  echo "ARGS:"
  echo " up      - Start containers "
  exit
fi


if [[ $1 == "prod" ]]; then
  echo "copying prod config files"
  cp ./app/config/.env.prod ./.env # .env file is used by docker compose
  cp nginx/alzkb.prod.conf nginx/alzkb.conf
else
  echo "copying dev config files"
  cp ./app/config/.env.dev ./.env # .env file is used by docker compose
  cp nginx/alzkb.dev.conf nginx/alzkb.conf
fi

echo "Building images..."
docker compose build

if [[ $2 == "up" ]]; then
  echo "Starting containers..."
  docker compose up -d
fi
