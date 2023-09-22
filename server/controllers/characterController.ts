import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Character from "../models/character";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import Globals from "./globals";
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
        console.log("setting time");
        console.log(time);
        app.locals.time = time;
        // console.log(app.locals);
        res.json({ Message: app.locals.time });
      } catch (error) {
        res.status(500).json({ Message: error, success: false });
      }
    } else {
      try {
        const toTime = seconds => {
          var date = new Date(null);
          date.setSeconds(seconds);
          return date.toISOString().substr(11, 8);
        };
        const elapsedTime = time - app.locals.time;
        console.log(time);
        console.log(app.locals.time);
        const newUser = new User({
          username: name,
          time: toTime(elapsedTime),
        });
        await newUser.save();
        //save elapsed time to db with their name. adda l eaderbaord display with al scores
        res.json({ Message: elapsedTime });
      } catch (error) {
        res.status(500).json({ Message: error, success: false });
      }
    }
  }
);
