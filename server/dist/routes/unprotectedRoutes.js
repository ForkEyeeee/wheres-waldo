"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyRouter = (0, express_1.Router)();
const characterController_1 = require("../controllers/characterController");
MyRouter.post("/", characterController_1.validateLocationSetJWT);
MyRouter.put("/", characterController_1.updateTimePut);
MyRouter.get("/leaderboard", characterController_1.getLeaderBoard);
exports.default = MyRouter;
