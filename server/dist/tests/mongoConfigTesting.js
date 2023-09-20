"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//// mongoConfigTesting.js
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
async function initializeMongoServer() {
    const mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    mongoose_1.default.connect(mongoUri);
    mongoose_1.default.connection.on("error", (e) => {
        if (e.message.code === "ETIMEDOUT") {
            console.log(e);
            mongoose_1.default.connect(mongoUri);
        }
        console.log(e);
    });
    mongoose_1.default.connection.once("open", () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
}
exports.default = initializeMongoServer;
