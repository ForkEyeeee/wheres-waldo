import { Request, Response, NextFunction } from "express";
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {});

module.exports = router;
