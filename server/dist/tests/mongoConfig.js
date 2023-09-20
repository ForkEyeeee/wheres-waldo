"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// mongoConfig.js
const mongoose_1 = __importDefault(require("mongoose"));
const mongoDb = process.env.dev_db_url;
mongoose_1.default.connect(mongoDb, { useNewUrlParser: true });
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
