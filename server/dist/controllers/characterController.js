"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderBoard = exports.setJWT = exports.updateTimePut = exports.validateLocationPost = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const character_1 = __importDefault(require("../models/character"));
const user_1 = __importDefault(require("../models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.validateLocationPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { character, pageX, pageY } = req.body;
        let characters = await character_1.default.find({});
        const validateLocation = () => {
            for (let i = 0; i < characters.length; i += 1) {
                if (pageX >= characters[i].locationXMin &&
                    pageX <= characters[i].locationXMax &&
                    pageY >= characters[i].locationYMin &&
                    pageY <= characters[i].locationYMax &&
                    character === characters[i].name) {
                    return true;
                }
            }
            return false;
        };
        res.json({
            success: validateLocation(),
        });
    }
    catch (error) {
        res.status(500).json({ Message: error, success: false });
    }
});
exports.updateTimePut = (0, express_async_handler_1.default)(async (req, res, next) => {
    let { name } = req.body;
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jsonwebtoken_1.default.verify(token[1], process.env.signature);
    const serverEndTime = Math.floor(Date.now() / 1000);
    const elapsedTime = serverEndTime - decoded.iat;
    try {
        const topTenUsers = await user_1.default.find()
            .sort({ time: -1 })
            .collation({ locale: "en_US", numericOrdering: true });
        const lastUser = topTenUsers[0];
        const toTime = (elapsedTime) => {
            const date = new Date(0);
            date.setSeconds(elapsedTime);
            return date.toISOString().substr(11, 8);
        };
        const timeStringToNumber = (time) => {
            const timeString = time;
            const [hours, minutes, seconds] = timeString.split(":").map(Number);
            return hours * 3600 + minutes * 60 + seconds;
        };
        const newUser = new user_1.default({
            username: name,
            time: toTime(elapsedTime),
        });
        let highscore = false;
        if (typeof lastUser !== "undefined") {
            if (elapsedTime < timeStringToNumber(lastUser.time) &&
                topTenUsers.length >= 10) {
                highscore = true;
                await user_1.default.findOneAndUpdate({ _id: lastUser.id }, { username: name, time: toTime(elapsedTime) });
            }
            else if (topTenUsers.length < 10) {
                highscore = true;
                await newUser.save();
            }
        }
        else {
            highscore = true;
            await newUser.save();
        }
        res.json({
            elapsedTime: toTime(elapsedTime),
            success: true,
            highscore: highscore,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ Message: error, success: false });
    }
});
exports.setJWT = (0, express_async_handler_1.default)(async (req, res, next) => {
    const serverStartTime = Math.floor(Date.now() / 1000);
    try {
        const token = jsonwebtoken_1.default.sign({ userId: req.body.userId, startTime: serverStartTime }, process.env.signature, {
            expiresIn: "365d",
        });
        res.status(200).json({
            success: true,
            data: {
                userId: req.body.userId,
                token: token,
                startTime: serverStartTime,
            },
        });
    }
    catch (err) {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
});
exports.getLeaderBoard = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const users = await user_1.default.find({});
        res.status(200).json({
            success: true,
            users: users,
        });
    }
    catch (err) {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
});
