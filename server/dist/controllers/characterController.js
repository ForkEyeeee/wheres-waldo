"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Character = require("../models/character");
const asyncHandler = require("express-async-handler");
exports.validateLocationPost = asyncHandler(async (req, res, next) => {
    try {
        const { pageX, pageY } = req.body;
        let characters = await Character.find({});
        const validateLocation = () => {
            for (let i = 0; i <= 2; i += 1) {
                if (pageX >= characters[i].locationXMin &&
                    pageX <= characters[i].locationXMax &&
                    pageY >= characters[i].locationYMin &&
                    pageY <= characters[i].locationYMax) {
                    return true;
                }
            }
            return false;
        };
        res.json({ Message: validateLocation() });
    }
    catch (error) {
        res.json({ Message: error });
    }
});
