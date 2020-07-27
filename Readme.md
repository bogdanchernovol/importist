# Fullstack Nodejs/Express.js/React/Redux application
This is monorepo for client application on based on React.js library and server side code based on Node.js/Express.js. 
Main feature is authorization:
- sign up with two steps;
- email activation account;
- forgot password;
- sign in.

## Server
```bash
# Change folder on server.
$ yarn install
$ yarn db:migrate
$ yarn start:server
```
Server running on http://localhost:3000

## Client
```bash
# Change folder on clint.
$ yarn install
$ yarn start
```
Application running on http://localhost:8080