"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};
