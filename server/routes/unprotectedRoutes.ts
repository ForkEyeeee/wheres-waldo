import { Request, Response, NextFunction } from "express";
import { Router } from "express";
const MyRouter = Router();

import { validateLocationPost } from "../controllers/characterController";

/* GET home page. */

MyRouter.post("/", validateLocationPost);

export default MyRouter;
