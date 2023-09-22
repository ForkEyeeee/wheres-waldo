"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInitialTime = exports.validateLocationPost = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const character_1 = __importDefault(require("../models/character"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.validateLocationPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    if (typeof req.body.name === "undefined") {
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
    }
    else {
        let { time, name } = req.body;
        try {
            const elapsedTime = time - globalThis.time;
            console.log(time);
            console.log(elapsedTime);
            console.log(globalThis.time);
            // const newUser = new User({
            //   username: name,
            //   time: elapsedTime,
            // });
            // await newUser.save();
            //save elapsed time to db with their name. adda l eaderbaord display with al scores
            res.json({ Message: elapsedTime });
        }
        catch (error) {
            res.status(500).json({ Message: error, success: false });
        }
    }
});
exports.updateInitialTime = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        globalThis.time = Math.floor(new Date("2012.08.10").getTime() / 1000);
        console.log(globalThis.time);
        res.json({ Message: globalThis.time });
    }
    catch (error) {
        res.status(500).json({ Message: error, success: false });
    }
});
// export const recordElapsedTime = asyncHandler(
//   async (req: Request, res: Response, next: NextFunction) => {}
// );
