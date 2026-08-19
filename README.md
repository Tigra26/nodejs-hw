# Notes REST API

Backend application for managing notes and users, built with Node.js, Express, MongoDB, and Mongoose.

The API supports note CRUD operations, authentication, email verification, password reset, user avatar upload, filtering, searching, sorting, and pagination.

Incoming requests are validated with Celebrate and Joi.

## Live API

https://nodejs-hw-g4he.onrender.com

The free Render instance may need some time to wake up before the first request.

## Repository

https://github.com/Tigra26/nodejs-hw

Branch:

```bash
05-mail-and-img
```

## Technologies

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* Celebrate
* Joi
* bcrypt
* JSON Web Token
* Cookie Parser
* Nodemailer
* Handlebars
* Multer
* Cloudinary
* CORS
* dotenv
* http-errors
* Pino HTTP
* Nodemon
* ESLint
* Prettier

## Features

* User registration
* User login
* User authentication
* Password hashing with bcrypt
* Access and refresh token handling
* Authentication with cookies
* Email verification
* Verification email sending
* Password reset email
* Password reset with token
* User avatar upload
* Image upload to Cloudinary
* File handling with Multer
* Notes CRUD operations
* Notes linked to authenticated users
* MongoDB Atlas connection
* Celebrate and Joi request validation
* Mongoose schema validation
* Pagination
* Filtering by tag
* Search by title and content
* Sorting
* MongoDB ObjectId validation
* Centralized error handling
* Request logging
* Deployment on Render

## Project structure

```text
src/
├── constants/
├── controllers/
│   ├── authController.js
│   ├── notesController.js
│   └── userController.js
├── db/
├── middleware/
│   ├── authenticate.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── multer.js
│   └── notFoundHandler.js
├── models/
│   ├── note.js
│   ├── session.js
│   └── user.js
├── routes/
│   ├── authRoutes.js
│   ├── notesRoutes.js
│   └── userRoutes.js
├── services/
├── templates/
│   └── reset-password-email.html
├── utils/
│   ├── saveFileToCloudinary.js
│   └── sendMail.js
├── validations/
└── server.js
```

## Installation

```bash
git clone https://github.com/Tigra26/nodejs-hw.git
cd nodejs-hw
git checkout 05-mail-and-img
npm install
```

## Environment variables

Create a `.env` file in the project root using `.env.example`.

Example:

```env
PORT=3000
NODE_ENV=development

MONGO_URL=mongodb+srv://<username>:<password>@<cluster-host>/notes?retryWrites=true&w=majority

JWT_SECRET=your_jwt_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_email

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

BASE_URL=http://localhost:3000
```

Do not commit the real `.env` file.

## Running the project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Local server:

```text
http://localhost:3000
```

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm start`      | Starts the server              |
| `npm run dev`    | Starts the server with Nodemon |
| `npm run format` | Formats JavaScript files       |
| `npm run lint`   | Runs ESLint                    |

# Authentication

## Register user

```http
POST /auth/register
```

Example body:

```json
{
  "username": "Mango",
  "email": "Mango@example.com",
  "password": "password123"
}
```

The password is hashed before being stored in MongoDB.

After registration, the application can send an email verification message to the user's email address.

## Login

```http
POST /auth/login
```

Example body:

```json
{
  "email": "Mango@example.com",
  "password": "password123"
}
```

After successful login, the server creates a user session and authentication tokens.

## Logout

```http
POST /auth/logout
```

Ends the current user session.

# Email functionality

The application uses Nodemailer for sending emails and Handlebars for HTML email templates.

Supported email functionality includes:

* Email verification
* Password reset email
* Password reset token handling

Email templates are stored in:

```text
src/templates/
```

## Password reset

A user can request a password reset email.

The server generates a token and sends a password reset link to the user's email address.

After opening the link, the token can be used to set a new password.

# User avatar

Authenticated users can upload an avatar image.

The uploaded file is processed with Multer and then uploaded to Cloudinary.

The Cloudinary image URL is stored in the user's document in MongoDB.

Example flow:

```text
Client
  ↓
Multer
  ↓
file.buffer
  ↓
Cloudinary
  ↓
secure_url
  ↓
MongoDB user.avatar
```

Example response:

```json
{
  "url": "https://res.cloudinary.com/.../avatar.jpg"
}
```

# Notes

Notes are associated with authenticated users.

## Get all notes

```http
GET /notes
```

Supported query parameters:

| Parameter   | Rules                   | Default                   |
| ----------- | ----------------------- | ------------------------- |
| `page`      | Integer, minimum 1      | `1`                       |
| `perPage`   | Integer from 5 to 20    | `10`                      |
| `tag`       | One of the allowed tags | —                         |
| `search`    | String, may be empty    | Empty string              |
| `sortBy`    | Sorting field           | Depends on implementation |
| `sortOrder` | `asc` or `desc`         | Depends on implementation |

Example:

```http
GET /notes?page=1&perPage=10&tag=Work&search=project
```

## Get one note

```http
GET /notes/:noteId
```

`noteId` must be a valid MongoDB ObjectId.

## Create a note

```http
POST /notes
```

Example body:

```json
{
  "title": "Buy groceries",
  "content": "Buy milk and bread",
  "tag": "Shopping"
}
```

## Update a note

```http
PATCH /notes/:noteId
```

Example body:

```json
{
  "title": "Updated title"
}
```

At least one of `title`, `content`, or `tag` must be provided.

## Delete a note

```http
DELETE /notes/:noteId
```

`noteId` must be a valid MongoDB ObjectId.

# Note model

| Field       | Type     | Required      | Default      |
| ----------- | -------- | ------------- | ------------ |
| `title`     | String   | Yes           | —            |
| `content`   | String   | No            | Empty string |
| `tag`       | String   | No            | `Todo`       |
| `userId`    | ObjectId | Yes           | —            |
| `createdAt` | Date     | Automatically | —            |
| `updatedAt` | Date     | Automatically | —            |

Allowed tags:

* Work
* Personal
* Meeting
* Shopping
* Ideas
* Travel
* Finance
* Health
* Important
* Todo

# Validation

Celebrate middleware validates incoming requests before controllers are executed.

Validation schemas are stored in:

```text
src/validations/
```

Mongoose also validates data before saving or updating documents in MongoDB.

# File uploads

Multer is used to process uploaded files.

Uploaded images are stored in memory and passed to Cloudinary using:

```js
file.buffer
```

The Cloudinary upload result contains the image URL:

```js
result.secure_url
```

This URL is saved to the user's `avatar` field.

# Error handling

The application handles:

* Celebrate validation errors
* Mongoose validation errors
* Invalid MongoDB ObjectId values
* Authentication errors
* Invalid credentials
* Missing users
* Missing notes
* Missing uploaded files
* Invalid or expired tokens
* Unknown routes
* Unexpected server errors

# Testing with Postman

For JSON requests:

1. Select the HTTP method.
2. Enter the endpoint URL.
3. Open **Body**.
4. Select **raw** and **JSON**.
5. Enter the request body.
6. Click **Send**.

Required header:

```text
Content-Type: application/json
```

For avatar upload:

1. Select the avatar upload endpoint.
2. Open **Body**.
3. Select **form-data**.
4. Add the file field.
5. Change the field type from `Text` to `File`.
6. Select an image.
7. Send the request.

For protected routes, the user must be authenticated.

# Author

Alena Shykova
