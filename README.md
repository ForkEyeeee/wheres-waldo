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

3. Set up your environment variables by creating a `.env` file in the `server` directory. Ensure it contains your MongoDB connection URI in the format `dev_db_url="your_connection_string"`

4. Launch the server:

   ```bash
   npm run serverstart
   ```

5. In a separate terminal, navigate to the `client` directory:

   ```bash
   cd path/to/wheres-waldo/client
   ```

6. Install dependencies for the client:

   ```bash
   npm install
   ```

7. Create a `.env` file within the `client` directory and add an environment variable in the format `VITE_ENDPOINT=http://localhost:5173/`.

8. Launch the client development server:

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
- [Jest](https://jestjs.io/) - JavaScript testing framework.
- [Chakra UI](https://chakra-ui.com/) - React component library.
- [Express](https://expressjs.com/) - Web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) - NoSQL database.
- [Mongoose](https://mongoosejs.com/) - Data modeling for MongoDB.
- [Supertest](https://www.npmjs.com/package/supertest) - HTTP testing library.
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) - In-memory MongoDB server.
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable manager.

---
