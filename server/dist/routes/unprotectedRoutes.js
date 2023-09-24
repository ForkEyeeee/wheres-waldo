"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyRouter = (0, express_1.Router)();
const characterController_1 = require("../controllers/characterController");
MyRouter.post("/", characterController_1.validateLocationPost);
MyRouter.put("/", characterController_1.updateLeaderBoardPut);
MyRouter.patch("/", characterController_1.updateInitialTimePatch);
exports.default = MyRouter;
