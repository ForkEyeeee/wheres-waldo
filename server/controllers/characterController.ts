import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import Character from "../models/character";
import asyncHandler from "express-async-handler";

export const validateLocationPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { character, pageX, pageY } = req.body;
      console.log(req.body);
      let characters = await Character.find({});
      const validateLocation = () => {
        for (let i = 0; i <= 2; i += 1) {
          if (
            pageX >= characters[i].locationXMin &&
            pageX <= characters[i].locationXMax &&
            pageY >= characters[i].locationYMin &&
            pageY <= characters[i].locationYMax
          ) {
            return characters[i].name;
          }
        }
        return false;
      };
      res.json({ characterName: validateLocation(), success: true }); //return the chracter name too
    } catch (error) {
      res.json({ Message: error, success: false });
    }
  }
);
