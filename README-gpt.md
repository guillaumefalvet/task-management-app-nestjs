# Task Management App (NestJS)

![NestJS](https://img.shields.io/badge/NestJS-7.0.0-E0234E)
![Node.js](https://img.shields.io/badge/Node.js-14.15.4-339933)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

A simple task management application built with NestJS, designed to help you keep track of your tasks efficiently.

## Table of Contents

- [Task Management App (NestJS)](#task-management-app-nestjs)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [API Endpoints](#api-endpoints)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Create, read, update, and delete tasks.
- Task categorization and priority.
- User authentication and authorization.
- Comprehensive API for task management.
- Built with NestJS, a scalable and efficient Node.js framework.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.15.4 recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/guillaumefalvet/task-management-app-nestjs.git
   cd task-management-app-nestjs
   ```

2. Install dependencies using npm:
   ```bash
   npm install
   ```

## Usage

To start the application, run:

```bash
npm run start
```

The application will be available at `http://localhost:3000` by default. You can access the API and interact with it using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## Configuration

You can configure the application by editing the `.env` file. Make sure to set environment-specific variables such as database connection details, JWT secrets, and other configuration settings.

## API Endpoints

The application provides the following API endpoints:

- `POST /auth/signup`: Register a new user.
- `POST /auth/login`: Log in and obtain an authentication token.
- `GET /tasks`: Get a list of tasks for the authenticated user.
- `GET /tasks/:id`: Get details of a specific task.
- `POST /tasks`: Create a new task.
- `PUT /tasks/:id`: Update an existing task.
- `DELETE /tasks/:id`: Delete a task.

Detailed API documentation can be found in the [API.md](API.md) file.

## Testing

You can run tests using the following command:

```bash
npm test
```

## Contributing

Feel free to contribute to this project by opening issues, suggesting enhancements, or creating pull requests. We welcome your input!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

Enjoy using your task management app built with NestJS! If you have any questions or need further assistance, please don't hesitate to reach out.
