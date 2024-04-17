  <div align="center">
<h1 align="center">
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<br>TASK-MANAGEMENT-APP-NESTJS</h1>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style&logo=Prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/Jest-C21325.svg?style&logo=Jest&logoColor=white" alt="Jest" />
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style&logo=ESLint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/Passport-34E27A.svg?style&logo=Passport&logoColor=white" alt="Passport" />

<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style&logo=ts-node&logoColor=white" alt="tsnode" />
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style&logo=Docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/Markdown-000000.svg?style&logo=Markdown&logoColor=white" alt="Markdown" />
<img src="https://img.shields.io/badge/JSON-000000.svg?style&logo=JSON&logoColor=white" alt="JSON" />
</p>
<img src="https://img.shields.io/github/license/guillaumefalvet/task-management-app-nestjs?style&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/guillaumefalvet/task-management-app-nestjs?style&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/guillaumefalvet/task-management-app-nestjs?style&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/guillaumefalvet/task-management-app-nestjs?style&color=5D6D7E" alt="GitHub top language" />
</div>

## Overview

This is a simple Task Management App built with NestJS, a powerful Node.js framework. It allows you to manage and organize your tasks efficiently. Whether you're a developer looking for a reference project or someone in need of a task management solution, this app can be a great starting point.

## Features

- Create, read, update, and delete tasks.
- User authentication and authorization.
- Secure password hashing.
- User registration and login.
- JSON Web Tokens (JWT) for user sessions.
- RESTful API with Swagger documentation.
- Minimalistic and easy-to-understand codebase, perfect for learning.

## OPTION 1: Running the app locally

### Installation

1. Create a psql database called `task-management`

```bash
$ npm install
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## OPTION 2: Running the app using docker

```bash
# build the image
$ docker compose build

# run the db 
$ docker compose up -d db

# run the containers

$ docker compose up nestapp
```

## Migrations & Seeding

### Migrations

```bash
# run the migrations
$ npm run typeorm:run-migrations

# revert the migrations
$ npm run typeorm:revert-migrations

# create a migrations
$ npm run typeorm:create-migrations --name=NameOfTheMigrations

```

### Seeding

```bash
# run the seedings & factories
$ npm run seed:run

# create seeding file
$ npm run seed:create --name=NameOfTheSeeding
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
