import { Router } from "express";
const MyRouter = Router();

import {
  validateLocationPost,
  updateTimePut,
  setJWT,
  getLeaderBoard,
} from "../controllers/characterController";

MyRouter.post("/", validateLocationPost);
MyRouter.put("/", updateTimePut);
MyRouter.patch("/", setJWT);
MyRouter.get("/leaderboard", getLeaderBoard);
export default MyRouter;
