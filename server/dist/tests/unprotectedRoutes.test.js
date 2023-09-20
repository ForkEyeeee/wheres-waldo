"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const unprotectedRoutes_1 = __importDefault(require("../routes/unprotectedRoutes"));
const express_1 = __importDefault(require("express"));
const mongoConfigTesting_1 = __importDefault(require("./mongoConfigTesting"));
const character_1 = __importDefault(require("../models/character"));
const wheresWaldoCharacterData_1 = __importDefault(require("./wheresWaldoCharacterData"));
const appTest = (0, express_1.default)();
(0, mongoConfigTesting_1.default)();
appTest.use(express_1.default.urlencoded({ extended: false }));
appTest.use("/", unprotectedRoutes_1.default);
describe("Character API tests", () => {
    beforeEach(async () => {
        await character_1.default.insertMany(wheresWaldoCharacterData_1.default);
    });
    afterEach(async () => {
        await character_1.default.deleteMany();
    });
    test("unprotectedRoutes", done => {
        (0, supertest_1.default)(appTest)
            .post("/")
            .send({ pageX: 890, pageY: 430 })
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
            if (res.body.Message === undefined) {
                throw new Error("Expected response body to be true or false");
            }
        })
            .end(done);
    });
});
