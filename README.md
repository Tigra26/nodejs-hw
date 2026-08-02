Notes REST API

A backend application for managing notes, built with Node.js, Express, MongoDB, and Mongoose.

The API supports creating, reading, updating, and deleting notes. It also includes request logging, environment variables, centralized error handling, and deployment on Render.

Live API

Base URL:

https://nodejs-hw-g4he.onrender.com

The free Render instance may go to sleep after a period of inactivity, so the first request can take longer.

Source code

https://github.com/Tigra26/nodejs-hw/tree/02-mongodb

Technologies

Node.js

Express

MongoDB Atlas

Mongoose

CORS

dotenv

http-errors

Pino HTTP

Pino Pretty

Nodemon

ESLint

Prettier

Features

Connection to MongoDB Atlas

Notes CRUD operations

Mongoose model and validation

JSON request body parsing

CORS support

HTTP request logging

Middleware for unknown routes

Centralized error handling

Environment variable configuration

Deployment on Render

Project structure

nodejs-hw/
├── src/
│   ├── controllers/
│   │   └── notesController.js
│   ├── db/
│   │   └── connectMongoDB.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   └── notFoundHandler.js
│   ├── models/
│   │   └── note.js
│   ├── routes/
│   │   └── notesRoutes.js
│   └── server.js
├── .editorconfig
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package.json
├── package-lock.json
└── README.md

Installation

Clone the repository:

git clone https://github.com/Tigra26/nodejs-hw.git

Go to the project directory:

cd nodejs-hw

Switch to the required branch:

git checkout 02-mongodb

Install dependencies:

npm install

Environment variables

Create a .env file in the project root.

Use .env.example as a template:

PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-host>/notes?retryWrites=true&w=majority&appName=<cluster-name>

Replace the placeholders with your MongoDB Atlas credentials.

Do not commit the real .env file to GitHub.

Running the application

Start the development server:

npm run dev

Start the application with Node.js:

npm start

After a successful start, the terminal should display messages similar to:

MongoDB connection established successfully
Server is running on port 3000

The local API will be available at:

http://localhost:3000

Available scripts

Command

Description

npm start

Starts the server with Node.js

npm run dev

Starts the server with Nodemon

npm run format

Formats JavaScript files with Prettier

npm run lint

Checks JavaScript files with ESLint

Note model

A note contains the following fields:

Field

Type

Required

Description

title

String

Yes

Note title

content

String

No

Note content; defaults to an empty string

tag

String

Yes

One of the allowed note categories

createdAt

Date

Automatically

Creation date

updatedAt

Date

Automatically

Last update date

Allowed tag values:

Work
Personal
Meeting
Shopping
Ideas
Travel
Finance
Health
Important
Todo

API endpoints

Check API status

GET /

Example response:

{
  "message": "Notes API is running"
}

Get all notes

GET /notes

Example:

GET http://localhost:3000/notes

Get one note

GET /notes/:noteId

Example:

GET http://localhost:3000/notes/NOTE_ID

If the note does not exist, the API returns 404 Not Found.

Create a note

POST /notes

Request body:

{
  "title": "Buy groceries",
  "content": "Buy milk and bread",
  "tag": "Shopping"
}

Successful response status:

201 Created

Update a note

PATCH /notes/:noteId

Request body example:

{
  "title": "Updated note title",
  "content": "Updated note content"
}

Successful response status:

200 OK

Delete a note

DELETE /notes/:noteId

Example:

DELETE http://localhost:3000/notes/NOTE_ID

Successful response status:

200 OK

Testing with Postman

For requests with a body:

Select the required method, such as POST or PATCH.

Enter the endpoint URL.

Open Body.

Select raw.

Select JSON.

Add the request body.

Click Send.

The request must include:

Content-Type: application/json

Error handling

Unknown routes return:

{
  "message": "Route not found"
}

When a requested note is not found, the API returns status 404.

Unexpected server errors return status 500.

Author

Alena Tigra
