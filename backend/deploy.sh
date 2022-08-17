#!/bin/bash

./gradlew build

docker stop yourseasons_deploy_spring

docker rm yourseasons_deploy_spring

docker rmi yourseasons_deploy_spring

docker build -t yourseasons_deploy_spring .

docker run -d -p 8080:8080 --name yourseasons_deploy_spring yourseasons_deploy_spring

docker logs -f yourseasons_deploy_spring
