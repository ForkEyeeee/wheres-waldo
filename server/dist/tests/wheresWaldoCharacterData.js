"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const data = [
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cadba2242a07b711b1a1"),
        name: "Waldo",
        locationXMax: 48,
        locationXMin: 44,
        locationYMax: 94,
        locationYMin: 90,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cf37a2242a07b711b1a2"),
        name: "Sonic The Hedgehog",
        locationXMax: 6,
        locationYMax: 79,
        locationYMin: 75,
        locationXMin: 2,
    },
    {
        _id: new mongoose_1.default.Types.ObjectId("6509cfc7a2242a07b711b1a3"),
        name: "Death",
        locationXMax: 67,
        locationYMin: 10,
        locationYMax: 17,
        locationXMin: 61,
    },
];
exports.default = data;
