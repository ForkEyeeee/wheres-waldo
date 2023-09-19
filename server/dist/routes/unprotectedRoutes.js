"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const characterController = require("../controllers/characterController");
/* GET home page. */
router.get("/", (req, res, next) => { });
router.post("/", characterController.validateLocationPost);
module.exports = router;
