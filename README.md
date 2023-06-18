# Senteces Web API

This project fulfills the requirements outlined in the challenge document.

## Deploy

The api has been deployed using render free tier, more info: Render: Cloud
Application Hosting for Developers [link](https://render.com)

## Installation

A Makefile has been provided for easy setup:

```sh
make all
```

A `.env` is required to se up all the required variables. If in render, set it
manually in the UI.

In render use this command to install all:

```sh
cd src/packages/deepl-api && npm install && cd .. && cd .. && cd .. && cd src/packages/firestore  && npm install  && cd .. && cd .. && cd ..  && cd src/packages/logger && npm install && cd .. && cd .. && cd .. && npm install
```

This command will install the necessary packages and dependencies.

## Run

To start the API, use the following command:

```sh
npm run start
```

This will run the API using Node.js.

## Assumptions

- The project has been designed with modularity in mind, allowing for easy reuse
  of code if the project is split into microservices in the future.
The Node.js versions 18 and 20 are supported.
- The input data file has been modified to include a specific field called
  "category" for better organization and to enable the use of indexes for
  pagination in Firebase.
- While using a tool like Lerna for dependency management is an option, it can
  complicate the deployment process on platforms like Render.com. Therefore, a
  Linux executable has been provided for installing the dependencies.
- Data sanitization has been omitted due to time constraints.
- Please note that the above instructions assume you are running the commands on
  a Linux or macOS system. If you are on Windows, consider using Git Bash or a
  similar shell environment to execute the commands.
  
## Author

Angel E
