"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyRouter = (0, express_1.Router)();
const characterController_1 = require("../controllers/characterController");
const characterController_2 = require("../controllers/characterController");
/* GET home page. */
MyRouter.post("/", characterController_1.validateLocationPost);
MyRouter.put("/", characterController_2.updateInitialTime);
exports.default = MyRouter;
