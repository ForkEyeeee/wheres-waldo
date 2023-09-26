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

2. Navigate to the `server` directory and install dependencies:

   ```bash
   cd wheres-waldo/server
   npm install
   ```

3. Generate a hashed signature using bcrypt.

4. Set up your environment variables by creating a `.env` file in the `server` directory. Ensure it contains the following:

   ```
   dev_db_url="your_connection_string"
   signature="your_hashed_signature"
   ```

5. Launch the server:

   ```bash
   npm run serverstart
   ```

6. In a separate terminal, navigate to the `client` directory:

   ```bash
   cd path/to/wheres-waldo/client
   ```

7. Install dependencies for the client:

   ```bash
   npm install
   ```

8. Create a `.env` file within the `client` directory. Ensure it contains the following:

   ```
   VITE_ENDPOINT=http://localhost:5173/
   ```

9. Launch the client development server:

   ```bash
   npm run dev
   ```

Visit the application in your browser at `http://localhost:5173`.

## Building for Production

1. Navigate to the `client` directory:

   ```bash
   cd path/to/wheres-waldo/client
   ```

2. Build the application:

   ```bash
   npm run build
   ```

## Technology Stack

- [React](https://reactjs.org/) - UI library for building web applications.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - Tool for testing React components.
- [Vitest](https://vitest.dev/) - Test runner built for Vite projects.
- [Chakra UI](https://chakra-ui.com/) - React component library.
- [Express](https://expressjs.com/) - Web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Mongoose](https://mongoosejs.com/) - Data modeling for MongoDB.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token implementation for Node.js.
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP testing library.
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) - In-memory MongoDB server.
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable manager.

---
