"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLocationPost = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const character_1 = __importDefault(require("../models/character"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.validateLocationPost = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { pageX, pageY } = req.body;
        console.log(pageX);
        console.log(pageY);
        let characters = await character_1.default.find({});
        console.log(characters);
        const validateLocation = () => {
            for (let i = 0; i <= 2; i += 1) {
                if (pageX >= characters[i].locationXMin &&
                    pageX <= characters[i].locationXMax &&
                    pageY >= characters[i].locationYMin &&
                    pageY <= characters[i].locationYMax) {
                    return true;
                }
            }
            return false;
        };
        res.json({ Message: validateLocation() });
    }
    catch (error) {
        console.log(error);
        res.json({ Message: error });
    }
});
