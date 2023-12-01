#!/bin/bash

function copyEnvironmentFileIfMissing() {
    if ! [ -f ".env" ];
    then
        ENVIRONMENT_FILE=".env.example";
        echo "==[ Copying $ENVIRONMENT_FILE to .env"
        cp $ENVIRONMENT_FILE .env.local
    fi
}

function runScriptInDockerContainer {
    docker compose exec -it node "$@";
}

copyEnvironmentFileIfMissing

docker compose down --remove-orphans

echo "==[ DOCKER INIT ]==";
docker compose up -d --remove-orphans

runScriptInDockerContainer pnpm install
runScriptInDockerContainer pnpm run dev