# Assignment 3-B Backend (Node.js + Express + MongoDB)

This backend provides **4 APIs for CRUD operations** on users used in assignment `ass-2-b`.

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)

## Setup

```bash
cd ass-2-b/backend
npm install
cp .env.example .env
```

Update `.env` with your MongoDB connection string.

## Run

```bash
npm run dev
```

or

```bash
npm start
```

Server runs on: `http://localhost:5000`

## APIs (4 CRUD endpoints)

Base URL: `http://localhost:5000/api`

1. **Create User**
   - `POST /users`
2. **Read All Users**
   - `GET /users`
3. **Update User**
   - `PUT /users/:id`
4. **Delete User**
   - `DELETE /users/:id`

## Sample Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "gender": "Male",
  "address": "Bangalore"
}
```
