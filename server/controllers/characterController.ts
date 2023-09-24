import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Character from "../models/character";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import express from "express";
import jwt from "jsonwebtoken";

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
    let { name } = req.body;

    const usertoken: any = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[1], process.env.signature);
    console.log(decoded);
    const serverEndTime = Math.floor(Date.now() / 1000);
    const elapsedTime = serverEndTime - decoded.iat; // Replaced 'time' with 'decoded.iat'
    console.log("this is elapsed time " + elapsedTime);
    // 'name' comes from the request body

    try {
      const topTenUsers = await User.find()
        .sort({ time: -1 })
        .collation({ locale: "en_US", numericOrdering: true });

      const lastUser = topTenUsers[0];
      const toTime = (elapsedTime: number) => {
        const date = new Date(0);
        date.setSeconds(elapsedTime);
        return date.toISOString().substr(11, 8);
      };

      const timeStringToNumber = time => {
        const timeString = time;
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return hours * 3600 + minutes * 60 + seconds;
      };

      const newUser = new User({
        username: name,
        time: toTime(elapsedTime),
      });

      let highscore = false;

      if (typeof lastUser !== "undefined") {
        if (
          elapsedTime < timeStringToNumber(lastUser.time) &&
          topTenUsers.length >= 10
        ) {
          highscore = true;
          await User.findOneAndUpdate(
            { _id: lastUser.id },
            { username: name, time: toTime(elapsedTime) }
          );
        } else if (topTenUsers.length < 10) {
          highscore = true;
          await newUser.save();
        }
      } else {
        highscore = true;
        await newUser.save();
      }

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

export const setJWT = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const serverStartTime = Math.floor(Date.now() / 1000);
    try {
      // Include server start time in JWT
      const token = jwt.sign(
        { userId: req.body.userId, startTime: serverStartTime },
        process.env.signature,
        {
          expiresIn: "30m",
        }
      );
      res.status(200).json({
        success: true,
        data: {
          userId: req.body.userId,
          token: token,
          startTime: serverStartTime, // send this to the client
        },
      });
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
  }
);
