import { Request, Response, NextFunction } from "express";
import { Router } from "express";
const MyRouter = Router();

import {
  validateLocationPost,
  updateLeaderBoardPut,
  updateInitialTimePatch,
} from "../controllers/characterController";

MyRouter.post("/", validateLocationPost);
MyRouter.put("/", updateLeaderBoardPut);
MyRouter.patch("/", updateInitialTimePatch);

export default MyRouter;
