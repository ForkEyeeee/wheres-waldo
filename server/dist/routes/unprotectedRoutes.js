"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MyRouter = (0, express_1.Router)();
const characterController_1 = require("../controllers/characterController");
const characterController_2 = require("../controllers/characterController");
/* GET home page. */
MyRouter.post("/", characterController_1.validateLocationPost);
MyRouter.put("/", characterController_2.updateTimePut);
MyRouter.patch("/", characterController_2.setJWT);
MyRouter.get("/leaderboard", characterController_2.getLeaderBoard);
exports.default = MyRouter;
