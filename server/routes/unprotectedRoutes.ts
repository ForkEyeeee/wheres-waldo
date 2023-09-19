import { Request, Response, NextFunction } from "express";
var express = require("express");
var router = express.Router();
const characterController = require("../controllers/characterController");

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {});

router.post("/", characterController.validateLocationPost);

module.exports = router;
