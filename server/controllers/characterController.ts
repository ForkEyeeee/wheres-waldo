import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Character from "../models/character";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import express from "express";

const app = express();

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

export const updateTimePut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { time, name } = req.body;
    if (typeof req.body.name === "undefined") {
      try {
        app.locals.time = time;
        res.json({ Message: app.locals.time, success: true });
      } catch (error) {
        res.status(500).json({ Message: error, success: false });
      }
    } else {
      try {
        const toTime = (elapsedTime: number) => {
          const date = new Date(0);
          date.setSeconds(elapsedTime);
          return date.toISOString().substr(11, 8);
        };
        const elapsedTime = time - app.locals.time;
        const newUser = new User({
          username: name,
          time: toTime(elapsedTime),
        });
        await newUser.save();
        res.json({ elapsedTime: toTime(elapsedTime), success: true });
      } catch (error) {
        res.status(500).json({ Message: error, success: false });
      }
    }
  }
);
