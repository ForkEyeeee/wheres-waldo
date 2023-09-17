require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const unprotectedRoutes = require("./routes/unprotectedRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();

// Compress all routes
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 2000,
});

app.use(cors());
app.use(limiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided." });
  }
  const token = authHeader.split(" ")[1]; // Expecting 'Bearer TOKEN'
  try {
    const decodedToken = jwt.verify(token, process.env.signature);
    req.userData = decodedToken; // Now, you can access user details via req.userData in routes after this middleware
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
}

app.use("/api", unprotectedRoutes);
app.use("/api", verifyToken, protectedRoutes);

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.dev_db_url;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({ message: res.locals.message, success: false });
});

module.exports = app;
