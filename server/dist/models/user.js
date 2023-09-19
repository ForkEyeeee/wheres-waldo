"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 200 },
    time: { type: String, required: true },
}, { collection: "users" });
module.exports = mongoose.model("User", UserSchema);
