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
      const { pageX, pageY } = req.body;
      let characters = await Character.find({});
      const validateLocation = () => {
        for (let i = 0; i <= 2; i += 1) {
          if (
            pageX >= characters[i].locationXMin &&
            pageX <= characters[i].locationXMax &&
            pageY >= characters[i].locationYMin &&
            pageY <= characters[i].locationYMax
          ) {
            return true;
          }
        }
        return false;
      };
      res.json({ Message: validateLocation() });
    } catch (error) {
      console.log(error);
      res.json({ Message: error });
    }
  }
);
