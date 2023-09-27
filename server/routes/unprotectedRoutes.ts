import { Router } from "express";
const MyRouter = Router();

import {
  validateLocationSetJWT,
  updateTimePut,
  getLeaderBoard,
} from "../controllers/characterController";

MyRouter.post("/", validateLocationSetJWT);
MyRouter.put("/", updateTimePut);
MyRouter.get("/leaderboard", getLeaderBoard);
export default MyRouter;
