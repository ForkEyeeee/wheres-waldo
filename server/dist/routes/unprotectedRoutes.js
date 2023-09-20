"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyRouter = (0, express_1.Router)();
const characterController_1 = require("../controllers/characterController");
/* GET home page. */
MyRouter.post("/", characterController_1.validateLocationPost);
exports.default = MyRouter;
