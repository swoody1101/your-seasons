#!/bin/bash

npm run build

docker stop yourseasons_deploy_react

docker rm yourseasons_deploy_react

docker rmi yourseasons_deploy_react

docker build -t yourseasons_deploy_react .

docker run -d -p 3000:443 --name yourseasons_deploy_react yourseasons_deploy_react
