#!/bin/bash

if [[ $1 == "prod" ]]; then
  cp ./app/config/.env.prod ./.env
else
  cp ./app/config/.env.dev ./.env
fi

docker compose up -d
