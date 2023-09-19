"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Character = require("../models/character");
const asyncHandler = require("express-async-handler");
exports.validateLocationPost = asyncHandler(async (req, res, next) => {
    const characters = await Character.find({});
    console.log(req.body);
    console.log(characters);
    res.json({ Message: "waldo" });
});
