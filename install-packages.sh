#!/bin/bash

echo "starting deepl"
cd src/packages/deepl-api 
npm install 
cd .. && cd .. && cd .. 

echo "starting firestore"
cd src/packages/firestore 
npm install 
cd .. && cd .. && cd .. 

echo "starting logger"
cd src/packages/logger 
npm install 
cd .. && cd .. && cd .. 

npm install
