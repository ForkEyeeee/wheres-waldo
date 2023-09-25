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
appTest.use(express_1.default.json());
appTest.use("/", unprotectedRoutes_1.default);
describe("Character API tests", () => {
    beforeEach(async () => {
        await character_1.default.insertMany(wheresWaldoCharacterData_1.default);
    });
    afterEach(async () => {
        await character_1.default.deleteMany();
    });
    describe("unprotectedRoutes", function () {
        it("should return jwt information", function (done) {
            (0, supertest_1.default)(appTest)
                .patch("/")
                .send({
                userId: "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9",
            })
                .set("Accept", "application/json")
                .expect(200)
                .expect(function (res) {
                if (res.body.data.userId !== "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9") {
                    throw new Error(`Expected userId to be '7f43e3a0-cbc9-4dc5-9892-e61250bba7c9', got ${res.body.userId}`);
                }
            })
                .end(done);
        });
        test("unprotectedRoutes", done => {
            (0, supertest_1.default)(appTest)
                .post("/")
                .send({ character: "Waldo", pageX: 46, pageY: 91 })
                .expect(200)
                .expect("Content-Type", /json/)
                .expect({ success: true })
                .expect((res) => {
                if (res.body === undefined) {
                    throw new Error("Expected response body to be true or false");
                }
            })
                .end(done);
        });
    });
    // test("updateTimePut", done => {
    //   request(appTest)
    //     .put("/")
    //     .send({
    //       name: "Mark",
    //     })
    //     .expect(200)
    //     .expect("Content-Type", /json/)
    //     .expect(function (res) {
    //       if (!res.body.sucess) {
    //         throw new Error(
    //           `Expected response success to be 'true', got ${res.body.success}`
    //         );
    //       }
    //     })
    //     .end(done);
    // });
});
