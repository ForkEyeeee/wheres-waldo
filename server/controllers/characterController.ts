require("dotenv").config();
import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Character = require("../models/character");
const asyncHandler = require("express-async-handler");

exports.validateLocationPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const characters = await Character.find({});
    console.log(req.body);
    console.log(characters);
    res.json({ Message: "waldo" });
  }
);
