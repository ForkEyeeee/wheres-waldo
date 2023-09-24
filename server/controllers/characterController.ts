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
    let highscore;
    if (typeof req.body.name === "undefined") {
      try {
        app.locals.time = time;
        res.json({ Message: app.locals.time, success: true });
      } catch (error) {
        res.status(500).json({ Message: error, success: false });
      }
    } else {
      try {
        const topTenUsers = await User.find()
          .sort({ time: -1 })
          .collation({ locale: "en_US", numericOrdering: true }); //get the top ten users
        // console.log(topTenUsers);

        // console.log(topTenUsers);
        const toTime = (elapsedTime: number) => {
          const date = new Date(0);
          date.setSeconds(elapsedTime);
          return date.toISOString().substr(11, 8);
        };

        const timeStringToNumber = time => {
          const timeString = time;
          const [hours, minutes, seconds] = timeString.split(":").map(Number);
          const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
          return totalTimeInSeconds;
        };
        console.log(topTenUsers);
        const lastUser = topTenUsers[0];
        console.log(lastUser);

        const elapsedTime = time - app.locals.time;
        const newUser = new User({
          username: name,
          time: toTime(elapsedTime),
        });

        if (typeof lastUser !== "undefined") {
          if (
            elapsedTime < timeStringToNumber(lastUser.time) &&
            topTenUsers.length >= 10
          ) {
            console.log("this route");

            await User.findOneAndUpdate(
              { _id: lastUser.id },
              { username: name, time: toTime(elapsedTime) }
            ); // if the time from the client is greater than the last users time, replace it with client data
          } else if (topTenUsers.length < 10) {
            await newUser.save();
          }
        } else {
          console.log("saving");
          await newUser.save();
        }

        console.log("sending json");
        res.json({
          elapsedTime: toTime(elapsedTime),
          success: true,
          highscore: false,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ Message: error, success: false });
      }
    }
  }
);
