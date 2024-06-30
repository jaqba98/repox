#!/bin/bash

docker build -t system:local -f ./projects/tools/docker/dockerfile/context/Dockerfile.system .

docker-compose -f ./projects/tools/docker/compose/docker-compose.preinstall.yaml up -d
docker-compose -f ./projects/tools/docker/compose/docker-compose.preinstall.yaml down --rmi all -v
