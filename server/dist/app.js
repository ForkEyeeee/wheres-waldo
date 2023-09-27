"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const unprotectedRoutes_1 = __importDefault(require("./routes/unprotectedRoutes"));
// import jwt from "jsonwebtoken";
const app = (0, express_1.default)();
// Compress all routes
app.use(helmet_1.default.contentSecurityPolicy({
    directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
}));
app.use((0, cors_1.default)({
    origin: "https://wheres-waldo-frontend.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, compression_1.default)());
// function verifyToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Token not provided." });
//   }
//   const token = authHeader.split(" ")[1]; // Expecting 'Bearer TOKEN'
//   try {
//     const decodedToken = jwt.verify(token, process.env.signature as any);
//     (req as any).userData = decodedToken; // Now, you can access user details via req.userData in routes after this middleware
//     next(); // Proceed to next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ success: false, message: "Invalid token." });
//   }
// }
app.use("/api", unprotectedRoutes_1.default);
// Set up mongoose connection
mongoose_1.default.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.dev_db_url;
main().catch(err => console.log(err));
async function main() {
    await mongoose_1.default.connect(mongoDB);
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err);
    res.json({ message: res.locals.message, success: false });
});
module.exports = app;
