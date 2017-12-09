#!/bin/bash

# Build our node.js program
docker build -t tictactoe ../

# Get COMMIT_ID
COMMIT_ID=$(git rev-parse HEAD)

# Tag it
docker tag tictactoe "m3ttle/tictactoe:${COMMIT_ID}"

# Push to docker hub
docker push "m3ttle/tictactoe:${COMMIT_ID}"