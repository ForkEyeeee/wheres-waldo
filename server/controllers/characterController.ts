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
      let characters = await Character.find({});
      const validateLocation = () => {
        for (let i = 0; i < characters.length; i += 1) {
          if (
            pageX >= characters[i].locationXMin &&
            pageX <= characters[i].locationXMax &&
            pageY >= characters[i].locationYMin &&
            pageY <= characters[i].locationYMax &&
            character === characters[i].name
          ) {
            return true;
          }
        }
        return false;
      };
      res.json({
        success: validateLocation(),
      });
    } catch (error) {
      res.status(500).json({ Message: error, success: false });
    }
  }
);
