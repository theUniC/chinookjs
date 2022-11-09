# chinook-js

## How to get started

1. Clone the code
2. `cd chinookjs`
3. Start services up 👉 `docker compose up -d`
4. Install backend packages 👉 `yarn workspace backend install`
5. Copy the env variables 👉 `cp packages/backend/.env.dist packages/backend/.env`
6. Start the backend 👉 `yarn workspace backend start:dev`

## Run the tests

1. Run the unit tests 👉 `yarn workspace backend test`
2. Run the unit tests with coverage 👉 `yarn workspace backend test:cov`

## Backend URLs

1. http://127.0.0.1:3000/api 👉 OpenAPI / Swagger
2. http://127.0.0.1:3000/graphql 👉 GraphQL Playground
