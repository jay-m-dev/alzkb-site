#!/bin/bash

if [[ $1 == "prod" ]]; then
  cp ./app/config/.env.prod ./.env
  cp nginx/alzkb.prod.conf nginx/alzkb.conf
else
  cp ./app/config/.env.dev ./.env
  cp nginx/alzkb.dev.conf nginx/alzkb.conf
fi

docker compose up -d
