require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import unprotectedRoutes from "./routes/unprotectedRoutes";
import jwt from "jsonwebtoken";

const app = express();

// Compress all routes
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

app.use(cors());
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
    (req as any).userData = decodedToken; // Now, you can access user details via req.userData in routes after this middleware
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
}

app.use("/api", unprotectedRoutes);

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB: any = process.env.MONGODB_URI || process.env.dev_db_url;

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
  res.status((err as any).status || 500);
  console.log(err);
  res.json({ message: res.locals.message, success: false });
});

module.exports = app;
