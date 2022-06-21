#!/bin/bash

docker compose --env-file ./config/.env.common -f nginx.yml up --build
