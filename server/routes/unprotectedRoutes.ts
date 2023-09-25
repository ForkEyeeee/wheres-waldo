import { Request, Response, NextFunction } from "express";
import { Router } from "express";
const MyRouter = Router();

import { validateLocationPost } from "../controllers/characterController";
import {
  updateTimePut,
  setJWT,
  getLeaderBoard,
} from "../controllers/characterController";

/* GET home page. */

MyRouter.post("/", validateLocationPost);
MyRouter.put("/", updateTimePut);
MyRouter.patch("/", setJWT);
MyRouter.get("/leaderboard", getLeaderBoard);
export default MyRouter;
