# Musicify Graphql Service
Tech stack: nestjs, graphql, apollo, axios, typescript
***
## Installation and first run
1. Clone repository
2. Move to `develop` branch
3. Enter `npm install` in terminal
4. `PORT` variable can be changed in the `.env` file
5. Run `start:dev` or `start:prod`
6. GraphQL server is available on http://localhost:3000/graphql by default

## Tips and tricks
1. To run all mutations (except `register`) or to get favourites valid token should be provided in `HTTP HEADERS` section, e.g. `{"authorization": "Bearer JWT"}`
2. If wrong input or invalid token is detected, an error message `Invalid input` or `Invalid token` will be shown
3. `Member` entity in `bands` was implemented as full `artist` plus `instruments` and `years`