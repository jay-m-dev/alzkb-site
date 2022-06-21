#!/bin/bash

docker compose --env-file ./config/.env.common -f app.yml up --build
