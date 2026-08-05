Notes REST API

Backend application for managing notes, built with Node.js, Express, MongoDB, and Mongoose.

The API supports creating, reading, updating, deleting, filtering, searching, sorting, and paginating notes. Incoming requests are validated with Celebrate and Joi.

Live API

https://nodejs-hw-g4he.onrender.com

The free Render instance may need some time to wake up before the first request.

Repository

https://github.com/Tigra26/nodejs-hw

Branch:

03-validation

Technologies

Node.js

Express

MongoDB Atlas

Mongoose

Celebrate

Joi

CORS

dotenv

http-errors

Pino HTTP

Nodemon

ESLint

Prettier

Features

Notes CRUD operations

MongoDB Atlas connection

Celebrate and Joi request validation

Mongoose schema validation

Pagination

Filtering by tag

Search by title and content

Sorting

MongoDB ObjectId validation

Centralized error handling

Request logging

Deployment on Render

Project structure

src/
├── constants/
│   └── tags.js
├── controllers/
│   └── notesController.js
├── db/
│   └── connectMongoDB.js
├── middleware/
│   ├── errorHandler.js
│   ├── logger.js
│   └── notFoundHandler.js
├── models/
│   └── note.js
├── routes/
│   └── notesRoutes.js
├── validations/
│   └── notesValidation.js
└── server.js

Installation

git clone https://github.com/Tigra26/nodejs-hw.git
cd nodejs-hw
git checkout 03-validation
npm install

Environment variables

Create a .env file in the project root using .env.example:

PORT=3000
NODE_ENV=development
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-host>/notes?retryWrites=true&w=majority

Do not commit the real .env file.

Running the project

Development mode:

npm run dev

Production mode:

npm start

Local server:

http://localhost:3000

Scripts

Command

Description

npm start

Starts the server

npm run dev

Starts the server with Nodemon

npm run format

Formats JavaScript files

npm run lint

Runs ESLint

Note model

Field

Type

Required

Default

title

String

Yes

—

content

String

No

Empty string

tag

String

No

Todo

createdAt

Date

Automatically

—

updatedAt

Date

Automatically

—

Allowed tags:

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

Get all notes

GET /notes

Supported query parameters:

Parameter

Rules

Default

page

Integer, minimum 1

1

perPage

Integer from 5 to 20

10

tag

One of the allowed tags

—

search

String, may be empty

Empty string

sortBy

Sorting field

Depends on implementation

sortOrder

asc or desc

Depends on implementation

Example:

GET /notes?page=1&perPage=10&tag=Work&search=project

Get one note

GET /notes/:noteId

noteId must be a valid MongoDB ObjectId.

Create a note

POST /notes

{
  "title": "Buy groceries",
  "content": "Buy milk and bread",
  "tag": "Shopping"
}

Update a note

PATCH /notes/:noteId

{
  "title": "Updated title"
}

At least one of title, content, or tag must be provided.

Delete a note

DELETE /notes/:noteId

noteId must be a valid MongoDB ObjectId.

Validation

Celebrate middleware validates incoming requests before controllers are executed.

Validation schemas:

getAllNotesSchema
noteIdSchema
createNoteSchema
updateNoteSchema

They are stored in:

src/validations/notesValidation.js

Mongoose also validates data before saving or updating documents in MongoDB.

Error handling

The application handles:

Celebrate validation errors

Mongoose validation errors

Invalid ObjectId values

Missing notes

Unknown routes

Unexpected server errors

Testing with Postman

For POST and PATCH requests:

Select the HTTP method.

Enter the endpoint URL.

Open Body.

Select raw and JSON.

Enter the request body.

Click Send.

Required header:

Content-Type: application/json

Author

Alena Shykova
