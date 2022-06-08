#!/bin/bash

cp ./app/config/.env.prod ./.env
docker compose up -d
