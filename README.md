# Node.js Homework — Express Server

A basic backend application built with Node.js and Express.

The project demonstrates how to create and configure an Express server, use middleware, work with environment variables, log HTTP requests, and run the application in development mode.

## Technologies

- Node.js
- Express
- CORS
- dotenv
- Pino HTTP
- Pino Pretty
- Nodemon
- ESLint
- Prettier
- EditorConfig

## Features

- Express server setup
- Environment variable configuration
- CORS support
- JSON request body parsing
- HTTP request logging
- Automatic server restart during development
- Code formatting with Prettier
- Code quality checking with ESLint
- ES modules support

## Project structure

```text
nodejs-hw/
├── src/
│   └── server.js
├── .editorconfig
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Tigra26/nodejs-hw.git
```

Go to the project directory:

```bash
cd nodejs-hw
```

Switch to the `01-express` branch:

```bash
git checkout 01-express
```

Install the dependencies:

```bash
npm install
```

## Running the application

Start the server in development mode:

```bash
npm run dev
```

Nodemon watches the project files and automatically restarts the server after changes.

Start the server in regular mode:

```bash
npm start
```

After starting, the server is available at:

```text
http://localhost:3000
```

The actual port is taken from the `PORT` environment variable.

## Middleware

### CORS

```js
app.use(cors());
```

CORS allows the server to receive requests from frontend applications running on another domain or port.

### JSON parser

```js
app.use(express.json());
```

`express.json()` parses JSON data received in the request body and makes it available through `req.body`.

### Pino HTTP logger

```js
app.use(
  pinoHttp({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
```

Pino HTTP logs information about incoming requests and server responses.

`pino-pretty` makes the logs easier to read during development.

## Available scripts

### Start the server

```bash
npm start
```

Runs the application with Node.js:

```text
node src/server.js
```

### Start the development server

```bash
npm run dev
```

Runs the application with Nodemon:

```text
nodemon src/server.js
```

### Format the code

```bash
npm run format
```

Formats all JavaScript files inside the `src` directory using Prettier.

### Check the code

```bash
npm run lint
```

Checks all JavaScript files inside the `src` directory using ESLint.

### Tests

```bash
npm test
```

Automated tests have not been configured yet.

## ES modules

The project uses ES modules because `package.json` contains:

```json
{
  "type": "module"
}
```

Therefore, imports are written using the `import` syntax:

```js
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import 'dotenv/config';
```

instead of CommonJS syntax:

```js
const express = require('express');
```

## Author

[Alena Tigra](https://github.com/Tigra26)
