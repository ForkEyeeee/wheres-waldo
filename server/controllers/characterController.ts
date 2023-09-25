import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import Character from "../models/character";
import User from "../models/user";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

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

declare module "jsonwebtoken" {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    userId: string;
  }
}

export const updateTimePut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;
    const usertoken: any = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded: any = jwt.verify(token[1], process.env.signature as any);
    const serverEndTime = Math.floor(Date.now() / 1000);
    const elapsedTime = serverEndTime - decoded.iat;

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

      const timeStringToNumber = (time: string) => {
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
      const token = jwt.sign(
        { userId: req.body.userId, startTime: serverStartTime },
        process.env.signature as any,
        {
          expiresIn: "365d",
        }
      );
      res.status(200).json({
        success: true,
        data: {
          userId: req.body.userId,
          token: token,
          startTime: serverStartTime,
        },
      });
    } catch (err) {
      console.log(err);
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
  }
);
