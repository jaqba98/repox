#!/bin/bash

docker-compose -f ./projects/tools/docker/compose/docker-compose.deploy-repox-local.yaml down --rmi all -v
