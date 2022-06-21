#!/bin/bash

SERVICE=$1

docker compose --env-file ./config/common.env -f .compose/$SERVICE.yml build
