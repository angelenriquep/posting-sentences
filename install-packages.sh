#!/bin/bash

cd ./src/packages

for dir in */; do
  if [ -d "$dir" ]; then
    cd "$dir" || continue
    echo "Installing dependencies for $dir..."
    npm install
    cd ..
  fi

cd ../../
done