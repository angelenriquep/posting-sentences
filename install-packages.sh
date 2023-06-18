#!/bin/bash

# Navigate to the src/packages directory
cd ./src/packages

# Loop through each package directory
for package_dir in */; do
  # Enter the package directory
  cd "$package_dir"
  
  # Execute npm install
  npm install

  # Return to the src/packages directory
  cd ..
cd ../../
done