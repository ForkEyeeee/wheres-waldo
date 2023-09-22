"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimePut = exports.validateLocationPost = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const character_1 = __importDefault(require("../models/character"));
const user_1 = __importDefault(require("../models/user"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
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
    let { time, name } = req.body;
    if (typeof req.body.name === "undefined") {
        try {
            console.log("setting time");
            console.log(time);
            app.locals.time = time;
            // console.log(app.locals);
            res.json({ Message: app.locals.time });
        }
        catch (error) {
            res.status(500).json({ Message: error, success: false });
        }
    }
    else {
        try {
            const toTime = seconds => {
                var date = new Date(null);
                date.setSeconds(seconds);
                return date.toISOString().substr(11, 8);
            };
            const elapsedTime = time - app.locals.time;
            console.log(time);
            console.log(app.locals.time);
            const newUser = new user_1.default({
                username: name,
                time: toTime(elapsedTime),
            });
            await newUser.save();
            //save elapsed time to db with their name. adda l eaderbaord display with al scores
            res.json({ Message: elapsedTime });
        }
        catch (error) {
            res.status(500).json({ Message: error, success: false });
        }
    }
});
