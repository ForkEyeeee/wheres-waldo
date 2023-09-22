"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, maxLength: 200 },
    time: { type: String, required: true },
}, { collection: "users" });
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
