---

# Where's Waldo Photo Tagging App

## Setup and Installation

### Prerequisites

Ensure [Node.js](https://nodejs.org/en/download/) and [npm](http://npmjs.com) are installed on your machine.

### Steps

1. Clone the project repository:

   ```bash
   git clone https://github.com/ForkEyeee/wheres-waldo
   ```

2. Install dependencies for the client:

   ```bash
   cd wheres-waldo/client
   npm install
   ```

3. Install dependencies for the server:

   ```bash
   cd ../server
   npm install
   ```

4. Set up your environment variables by creating a `.env` file in the `server` directory. Ensure it contains your MongoDB connection URI in the format `dev_db_url="your_connection_string"`

5. In the `.env` file within the `client` directory, add an environment variable in the format `VITE_ENDPOINT=http://localhost:5173/`.

6. Navigate to the `server` directory and launch the server:

   ```bash
   npm run serverstart
   ```

7. In a separate terminal, navigate to the `client` directory and launch the client development server:

   ```bash
   cd path/to/wheres-waldo/client
   npm run dev
   ```

Visit the application in your browser at `http://localhost:5173`.

## Building for Production

To prepare the client for deployment in a production environment:

1. Navigate to the `client` directory:

   ```bash
   cd path/to/wheres-waldo/client
   ```

2. Build the application:

   ```bash
   npm run build
   ```

## Technology Stack

- [React](https://reactjs.org/) - JavaScript library for UI building.
- [Express](https://expressjs.com/) - Web app framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - NoSQL document-oriented database.
- [Mongoose](https://mongoosejs.com/) - ODM library for MongoDB and Node.js.
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP assertions library.
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) - In-memory database server for MongoDB.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Tool for generating JSON web tokens.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Library for password hashing.
- [dotenv](https://www.npmjs.com/package/dotenv) - Module to manage environment variables.

---
