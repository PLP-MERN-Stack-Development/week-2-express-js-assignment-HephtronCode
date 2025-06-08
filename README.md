# Product Management REST API

A robust and scalable RESTful API for managing a product inventory, built with Node.js, Express.js, and MongoDB. This project is designed with best practices, featuring a clean MVC-like architecture, JWT-based authentication, validation, and comprehensive error handling.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoint Documentation](#api-endpoint-documentation)
  - [Authentication](#authentication)
  - [Products](#products)
    - [GET /api/products](#get-apiproducts)
    - [GET /api/products/stats](#get-apiproductsstats)
    - [GET /api/products/:id](#get-apiproductsid)
    - [POST /api/products](#post-apiproducts)
    - [PUT /api/products/:id](#put-apiproductsid)
    - [DELETE /api/products/:id](#delete-apiproductsid)
- [Environment Variables](#environment-variables)

## Features

- **CRUD Operations**: Full Create, Read, Update, and Delete functionality for products.
- **Authentication**: Secure endpoints using a secret API Key passed in the headers.
- **Validation**: Server-side request body validation using `express-validator`.
- **Advanced Querying**:
  - **Filtering**: Filter products by any field (e.g., `category`).
  - **Searching**: Case-insensitive text search on product names.
  - **Pagination**: `page` and `limit` parameters to control response size.
- **Data Aggregation**: A `/stats` endpoint to provide computed statistics on the product set.
- **Structured Error Handling**: Centralized middleware for consistent and predictable error responses.
- **Scalable Architecture**: Code is organized into `models`, `routes`, `controllers`, and `middleware`.

## Project Structure

```
.
├── controllers/      # Handles business logic
├── middleware/       # Custom middleware (auth, error handling, etc.)
├── models/           # Mongoose data models and schemas
├── routes/           # Defines API routes
├── utils/            # Utility functions and helper classes
├── .env              # Environment variables
├── .env.example      # Example environment file
├── server.js         # Main server entry point
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local instance or Atlas connection string)
- An API testing tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env` file in the project root by copying the `.env.example` file.
    ```sh
    cp .env.example .env
    ```
    Then, update the `.env` file with your specific configuration.
4.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The server will be running on `http://localhost:3000` (or the port specified in your `.env`).

## API Endpoint Documentation

**Base URL**: `/api`

### Authentication

Protected routes require an API key to be passed in the request headers.

-   **Header**: `x-api-key: YOUR_SECRET_API_KEY`

### Products

#### `GET /api/products`
Retrieves a list of all products with support for filtering, searching, and pagination.

-   **Query Parameters**:
    -   `category` (string): Filter by product category.
    -   `search` (string): Perform a case-insensitive search on the product name.
    -   `page` (number): Page number for pagination (default: `1`).
    -   `limit` (number): Number of results per page (default: `10`).
-   **Example Request**: `GET /api/products?category=electronics&page=1&limit=5`

#### `GET /api/products/stats`
Retrieves aggregated statistics about the product inventory, grouped by category.

#### `GET /api/products/:id`
Retrieves a single product by its unique `id` (UUID).

#### `POST /api/products`
Creates a new product.
-   **Authentication**: Required.
-   **Request Body**:
    ```json
    {
      "name": "string (required)",
      "description": "string (required)",
      "price": "number (required)",
      "category": "string (required)",
      "inStock": "boolean (optional)"
    }
    ```

#### `PUT /api/products/:id`
Updates an existing product by its `id`.
-   **Authentication**: Required.
-   **Request Body**: An object containing the fields to be updated.

#### `DELETE /api/products/:id`
Deletes a product by its `id`.
-   **Authentication**: Required.

## Environment Variables

The following variables are required for the application to run. Store them in a `.env` file in the project root.

-   `PORT`: The port on which the server will listen (e.g., `3000`).
-   `MONGO_URI`: The connection string for your MongoDB database.
-   `API_KEY`: A secret string used for authenticating protected API routes.