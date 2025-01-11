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

**Create a .env file with:**
- **MONGO_URI=your-database-url**
- **PORT=your-port**
- **JWT_SECRET=your-secrete-key**

    Setup the project and and connect with mongodb db database
-------------------------

## 1. User Signup API
The User Signup API handles user registration by securely storing their credentials in the database.

### Key Features
- **Validation:** Ensures all required fields (username, email, password) are provided.
- **Email Uniqueness:** Checks if the email is already in use and prevents duplicate accounts.
    ### Password Security:
    - Uses **bcrypt** to hash passwords with a generated salt for secure storage.
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
- 400: Missing fields (Required - all the fields).
- 409: Email already in use (Email already in use).
- 500: Internal server error (Internal Server Error).
-------------------------

## 2. User Login API
The User Login API allows registered users to authenticate and receive a secure token for accessing protected routes.


### Key Features
- **Validation:** Ensures that both email and password fields are provided.
- **User Lookup:** Verifies if a user exists in the database using their email.
- **Password Verification:** Compares the provided password with the hashed password stored in the database using bcrypt.
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
- 400: Missing fields (Required all the fields).
- 404: User not found (User not found).
- 401: Invalid password (Invalid credentials).
- 500: Internal server error (Internal Server Error).

### Security Notes
- Passwords are never stored in plaintext; **hashed passwords** are used for verification.
- The **JWT token** is signed securely and should be included in requests to access protected endpoints.
------------------------

### 3. Fetch All Transactions API
**The Fetch All Transactions API** retrieves transaction details by joining data from two collections and structuring it into a simplified and readable format.

**Key Features**
- **Aggregation Pipeline**:
  - **Uses MongoDB's $lookup** to join data from the **CollectRequestStatus** collection and the **collect_requests** collection.
  - **$unwind** is applied to flatten the joined data array into individual documents.
  - **$project** is used to select and organize specific fields in the output.
- **Efficient Querying**: Optimized retrieval of transaction data with relevant details like **collect_id, school_id, order_amount, transaction_amount**, and more.

**API Endpoint**

**GET /transactions**

**Response**
- **Success (200): Returns a list of all transactions.**

``` json
{
  "transactions": [
    {
      "collect_id": "123456",
      "school_id": "S001",
      "gateway": "Stripe",
      "order_amount": 5000,
      "transaction_amount": 4950,
      "status": "Success",
      "custom_order_id": "ORD12345",
      "createdAt": "2023-12-25T12:00:00.000Z"
    },
    ...
  ]
}

```
**Error Responses:**
- **500: Internal server error (Internal server error)**

**Technical Details**
- **Collections Used:** Primary collection containing transaction statuses.

- **CollectRequestStatus**: Primary collection containing transaction statuses.
 
**Fields in Response:**
- **collect_id, school_id, gateway, order_amount, transaction_amount, status, custom_order_id, and createdAt**.
---------------------
### 4. Get Transaction Details API
The **Get Transaction Details API** retrieves detailed transaction information for a specific school using the provided school ID.

**Key Features**
- **Aggregation Pipeline:**
- **Uses MongoDB’s $lookup** to join the **CollectRequestStatus** collection with the **collect_requests** collection.
- **$unwind** flattens the joined data for easier access to individual transaction details.
- **$match** filters the results to include only the transactions for the specified schoolId.
- **$project** formats the output to show relevant fields like **collect_id, school_id, gateway, order_amount, and transaction_amount**.
- **Flexible Querying:** Only returns transaction details related to the specific schoolId provided in the request.

**API Endpoint**

**GET /transactions/:schoolId**

**Request Parameters**
- **schoolId:** The unique identifier of the school for which transaction details are fetched.

**Response**
- **Success (200):** Returns a list of transactions for the provided schoolId.

``` json 

{
  "transaction": [
    {
      "collect_id": "123456",
      "school_id": "S001",
      "gateway": "Stripe",
      "order_amount": 5000,
      "transaction_amount": 4950,
      "status": "Success",
      "custom_order_id": "ORD12345",
      "createdAt": "2023-12-25T12:00:00.000Z"
    }
  ]
}

```

- **Error Responses:**
  - 400: Missing schoolId in the request (Please provide order id).
  - 500: Internal server error (Internal server error).
 
   **Technical Details**
   - **Collections used**
     - **CollectRequestStatus:** Contains transaction status data.
     - **collect_requests:** Contains details for each individual transaction.
   - **Fields in Response:**
      - **collect_id, school_id, gateway, order_amount, transaction_amount, status, custom_order_id, and createdAt.**
-----------------

### 5. Check Status API
The **Check Status API** retrieves the status and details of a transaction based on the provided orderId. It checks for the transaction's current status and related details.

**Key Features**
- **Aggregation Pipeline:**
  - **Uses MongoDB’s $lookup** to join the **CollectRequestStatus** collection with the **collect_requests** collection.
  - **$unwind** flattens the joined data for easier access to individual transaction details.
  - **$match** filters the results to include only the transaction matching the provided orderId.
  - **$project** structures the response with relevant fields such as **collect_id, school_id, gateway, order_amount, transaction_amount, and status**.

- **Order ID Lookup:** Allows querying transactions by a unique orderId (custom order ID).

**API Endpoint**

**GET /check-status/:orderId**

**Request Parameters**

- **orderId:** The custom order ID for the transaction to retrieve.

**Response**
  - **Success (200):** Returns the transaction details related to the provided orderId.

``` json

{
  "transaction": [
    {
      "collect_id": "123456",
      "school_id": "S001",
      "gateway": "Stripe",
      "order_amount": 5000,
      "transaction_amount": 4950,
      "status": "Success",
      "custom_order_id": "ORD12345",
      "createdAt": "2023-12-25T12:00:00.000Z"
    }
  ]
}
```
**Error Responses:**
- 400: Missing orderId in the request (Please provide order id).
- 500: Internal server error (Internal server error).

**Technical Details**
- **Collections Used:**
  - **CollectRequestStatus:** Contains transaction status data.
  - **collect_requests:** Contains details for each individual transaction.
 
**Fields in Response:**
- **collect_id, school_id, gateway, order_amount, transaction_amount, status, custom_order_id, and createdAt.**
--------------------

### 6. Webhook API
The **Webhook API** listens for incoming updates from external payment gateways and updates the transaction status accordingly in the database.

**Key Features**
- **Data Update:**
  - Receives updates from an external payment gateway with details such as **status, order_id, order_amount, transaction_amount, gateway, and bank_reference.**
  - Updates the transaction status and other details for the matching **collect_id in the CollectRequest collection.**

 - **Status Response:**
 - Returns a success message when the transaction is updated.
 - Returns a 404 error if the transaction is not found.
 - Handles errors and provides a 500 error response if an issue occurs during the update

**API Endpoint**

**POST /webhook**

**Request Body**

  ``` json 
  {
    "status": "Success",
    "order_info": {
    "order_id": "123456",
    "order_amount": 5000,
    "transaction_amount": 4950,
    "gateway": "Stripe",
    "bank_reference": "BANK12345"
    }
  }
```
**Response**
- **Success (200):**
  ``` json
  {
    "message": "Transaction updated successfully",
    "data": {
    "_id": "605c72ef1532071b4f7d8571",
    "collect_id": "123456",
    "status": "Success",
    "order_amount": 5000,
    "transaction_amount": 4950,
    "gateway": "Stripe",
    "bank_reference": "BANK12345",
    "createdAt": "2025-01-11T00:00:00.000Z",
    "__v": 0
  }
  ```
  **Error Responses:**
  -  404: Transaction not found (Transaction not found).
  -  500: Internal server error (Internal Server Error).
  -  
  **Technical Details**
  - **Collection Used:**
  - **CollectRequest:** Contains transaction details, including the status and payment information.
  
  **Fields in Request:**

  **status, order_info.order_id, order_info.order_amount, order_info.transaction_amount, order_info.gateway, and order_info.bank_reference.**
---------------------------

### 7. Status Update API  

The **Status Update API** allows updating the transaction status of a specific collect request using the provided `collect_id`. It ensures that the status of a transaction is updated in the database.

#### Key Features  
- **Status Update**:  
  - Accepts a `collect_id` and a `status` to update the transaction status.  
  - The transaction is located by the `collect_id` and its status is updated to the new value.  
- **Response**:  
  - Returns a success message if the transaction is updated successfully.  
  - Returns a 404 error if the transaction with the provided `collect_id` is not found.  
  - Returns a 500 error in case of an internal server error.

#### API Endpoint  
**POST /status-update**  

#### Request Body  
```json  
{
  "collect_id": "123456",
  "status": "Completed"
}
```

**Response**
- **Success**
  ``` json 
  {
    "message": "Status updated successfully"
  }
  ```
**Error Responses:**
- 404: Transaction not found (Transaction not found).
- 500: Internal server error (Internal Server Error).

**Technical Details**
- **Collection Used:**
  - **CollectRequestStatus:** Contains the status of collect requests.
- **Fields in Request:**
- collect_id and status.
----------------------------------------------

### 8. Set Collect Requests API  

The **Set Collect Requests API** is responsible for creating new collect requests in the database. It allows the addition of a new collect request with specific details such as `school_id`, `trustee_id`, `gateway`, `order_amount`, and `custom_order_id`.

#### Key Features  

- **Create Collect Request**:  
  - Accepts request body with details such as `_id`, `school_id`, `trustee_id`, `gateway`, `order_amount`, and `custom_order_id`.  
  - Creates a new collect request record in the `CollectRequest` collection.

- **Response**:  
  - Returns a success message if the collect request is created successfully.
  - Handles errors and provides a 500 error response if an issue occurs during the creation process.

#### API Endpoint  
**POST /set-collect-request**  

#### Request Body  
```json  
{
  "_id": "123456",
  "school_id": "78910",
  "trustee_id": "112233",
  "gateway": "Stripe",
  "order_amount": 5000,
  "custom_order_id": "CUST123456"
}
```

**Response**
- **Success (200):**
  ``` json
    {
      "message": "Collect request created successfully"
    }
    ```
- **Error Responses:**
  - 500: Internal server error (Internal server error).
  - 
**Technical Details**
  - **Collection Used:**
    - **CollectRequest:** Contains details of the collect requests, such as the amount, school, trustee, and gateway information.
- **Fields in Request:**
  
    **_id, school_id, trustee_id, gateway, order_amount, and custom_order_id.** 
  
This API is designed to create a new collect request in the database, initializing the details for each transaction based on the provided parameters.


------------------------------------------

### 9. Set Collect Request Statuses API  

The **Set Collect Request Statuses API** allows you to create or update the status of a collect request in the database, including transaction-related details such as `status`, `payment_method`, `gateway`, `transaction_amount`, and `bank_reference`.

#### Key Features  

- **Create Collect Request Status**:  
  - Accepts request body with details such as `collect_id`, `status`, `payment_method`, `gateway`, `transaction_amount`, and `bank_refrence`.  
  - Creates a new collect request status record in the `CollectStatusRequest` collection.

- **Response**:  
  - Returns a success message with the newly created record when the collect request status is successfully added.
  - Handles errors and provides a 500 error response if an issue occurs during the creation process.

#### API Endpoint  
**POST /set-collect-request-status**  

#### Request Body  
```json  
{
  "collect_id": "123456",
  "status": "Success",
  "payment_method": "Credit Card",
  "gateway": "Stripe",
  "transaction_amount": 4950,
  "bank_refrence": "BANK12345"
}
