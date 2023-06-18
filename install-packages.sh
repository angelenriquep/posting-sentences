#!/bin/bash

# cd ./src/packages

# for dir in */; do
#   if [ -d "$dir" ]; then
#     cd "$dir" || continue
#     echo "Installing dependencies for $dir..."
#     npm install
#     cd ..
#   fi
# done
# cd ../../
# done

cd src/packages/deepl-api
npm install
cd ../..
cd src/packages/firestore
npm install
cd ../..
cd src/packages/logger
npm install
cd ../..
npm install