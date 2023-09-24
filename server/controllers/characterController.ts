import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Character from "../models/character";
import User from "../models/user";
import jwt from "jsonwebtoken";
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

export const updateLeaderBoardPut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { name, time } = req.body;
    let highscore = false;

    try {
      const topTenUsers = await User.find()
        .sort({ time: -1 })
        .collation({ locale: "en_US", numericOrdering: true }); //get the top ten users
      const lastUser = topTenUsers[0];
      console.log(time);
      console.log(app.locals.time);
      const elapsedTime = time - global.time;
      console.log(elapsedTime);
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
          highscore = true;
          await User.findOneAndUpdate(
            { _id: lastUser.id },
            { username: name, time: toTime(elapsedTime) }
          ); // if the time from the client is greater than the last users time, replace it with client data
        } else if (topTenUsers.length < 10) {
          highscore = true;
          await newUser.save();
        }
        // highscore = false;
      } else {
        highscore = true;
        console.log("saving");
        await newUser.save();
      }
      // highscore = true;
      console.log("sending json");
      res.json({
        elapsedTime: toTime(elapsedTime),
        success: true,
        highscore: highscore,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ Message: error, success: false });
    }
  }
);

export const updateInitialTimePatch = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    try {
      // Creating jwt token
      token = jwt.sign(
        { userId: existingUser._id, username: existingUser.username },
        process.env.signature,
        { expiresIn: "30m" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    let { time } = req.body;
    const usertoken: any = req.headers.authorization;
    const token = usertoken.split(" ");
    jwt.verify(token[1], process.env.signature);
    console.log(token);
    try {
      console.log("initial time " + time);
      res.json({ time: time, success: true });
    } catch (error) {
      res.status(500).json({ Message: error, success: false });
    }
  }
);
