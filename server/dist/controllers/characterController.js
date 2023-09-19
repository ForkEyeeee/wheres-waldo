"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Character = require("../models/character");
const asyncHandler = require("express-async-handler");
exports.wheresWaldoGet = asyncHandler(async (req, res, next) => {
    res.json({ Message: "waldo" });
});
