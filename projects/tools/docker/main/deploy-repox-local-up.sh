#!/bin/bash

docker build -t system:local -f ./projects/tools/docker/dockerfile/context/Dockerfile.system .

docker-compose -f ./projects/tools/docker/compose/docker-compose.deploy-repox-local.yaml up -d
