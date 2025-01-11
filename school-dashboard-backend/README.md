# School Payment and Dashboard Application

This repository contains the backend code for the School Payment and Dashboard Application.

## Key Features

- Backend API built with **Express.js**.
- Organized project structure for maintainability and scalability.
- Secured APIs using **CORS** and middleware for JSON data handling.
- Seamless **MongoDB** integration for database management.
- Implements JWT-based authentication and password hashing for enhanced security.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or later)
- **MongoDB** (Atlas)

## Install Dependencies
install required modules such as express, mongoose, dotenv, bcryptjs, jsonwebtoken, cors etc.

### 2. Create a .env file with:
- **MONGO_URI=your-database-url**
- **PORT=your-port**
- **JWT_SECRET=your-secrete-key**

    Setup the project and and connect with mongodb db database


### 2. User Signup API
The User Signup API handles user registration by securely storing their credentials in the database.

### Key Features
- Validation: Ensures all required fields (username, email, password) are provided.
- Email Uniqueness: Checks if the email is already in use and prevents duplicate accounts.
    ### Password Security:
    - Uses bcrypt to hash passwords with a generated salt for secure storage.
    - Ensures sensitive data is not stored in plaintext.
    ### Database interaction:
    - Creates a new user document in the database.
    - Returns user information upon successful registration (excluding the password).

### API Endpoint: User Signup
#### **Endpoint**
`POST /signup`

#### **Request Body**
```json
{
  "username": "exampleUser",
  "email": "example@example.com",
  "password": "examplePassword"
}
```

#### **Response**
- **Success (201)**:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "userId",
    "username": "exampleUser",
    "email": "example@example.com"
  }
}
```
### Error Responses:
- **400: Missing fields (Required - all the fields).**
- **409: Email already in use (Email already in use).**
- **500: Internal server error (Internal Server Error).**


## 2. User Login API
The User Login API allows registered users to authenticate and receive a secure token for accessing protected routes.


### Key Features
- Validation: Ensures that both email and password fields are provided.
- User Lookup: Verifies if a user exists in the database using their email.
- Password Verification: Compares the provided password with the hashed password stored in the database using bcrypt.
- #### JWT Token Generation:
  - Uses the generateToken function to create a JSON Web Token (JWT) upon successful login.
  - The token is returned as part of the response for use in future requests.

### API Endpoint: User Login
#### **Endpoint**
`POST /login`

#### **Request Body**
```json
{
  "email": "example@example.com",
  "password": "examplePassword"
}
```

#### **Response**
- **Success (200): Returns a token for authenticated access**:
```json
{
  "jwt_token": "yourGeneratedToken"
}
```
### Error Responses:
- **400: Missing fields (Required all the fields).**
- **404: User not found (User not found).**
- **401: Invalid password (Invalid credentials).**
- **500: Internal server error (Internal Server Error).**

### Security Notes
- Passwords are never stored in plaintext; hashed passwords are used for verification.
- The JWT token is signed securely and should be included in requests to access protected endpoints.
