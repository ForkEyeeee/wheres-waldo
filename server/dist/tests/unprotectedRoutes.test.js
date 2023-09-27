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
beforeEach(async () => {
    await character_1.default.insertMany(wheresWaldoCharacterData_1.default);
});
afterEach(async () => {
    await character_1.default.deleteMany();
});
describe("unprotectedRoutes", function () {
    test("setJWT", function (done) {
        (0, supertest_1.default)(appTest)
            .post("/")
            .send({
            userId: "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9",
        })
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
            if (!res.body.success) {
                throw new Error(`Expected success to be true, got ${res.body.success}`);
            }
            if (res.body.data.userId !== "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9") {
                throw new Error(`Expected userId to be '7f43e3a0-cbc9-4dc5-9892-e61250bba7c9', got ${res.body.data.userId}`);
            }
            if (!res.body.data.token) {
                throw new Error("Expected token to exist");
            }
            if (!res.body.data.startTime) {
                throw new Error("Expected startTime to exist");
            }
        })
            .end(done);
    });
    test("validateLocationPost", done => {
        (0, supertest_1.default)(appTest)
            .post("/")
            .send({ character: "Waldo", pageX: 46, pageY: 91 })
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
            if (res.body.success === undefined) {
                throw new Error("Expected success to be true or false");
            }
        })
            .end(done);
    });
    test("updateTimePut", done => {
        (0, supertest_1.default)(appTest)
            .post("/")
            .send({ userId: "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9" })
            .end((err, res) => {
            if (err)
                return done(err);
            const token = res.body.data.token;
            (0, supertest_1.default)(appTest)
                .put("/")
                .send({ name: "Mark" })
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .expect(200)
                .end((err, res) => {
                if (err) {
                    console.error("Error in PUT request:", res.body);
                    return done(err);
                }
                return done();
            });
        });
    });
    test("getLeaderboard", done => {
        (0, supertest_1.default)(appTest)
            .get("/leaderboard")
            .expect(200)
            .expect("Content-Type", /json/)
            .expect(function (res) {
            if (!res.body.success) {
                throw new Error(`Expected success to be true, got ${res.body.success}`);
            }
            if (!Array.isArray(res.body.users) || res.body.users.length === 0) {
                throw new Error("Expected users to be a non-empty array");
            }
            const user = res.body.users[0];
            if (!user._id || !user.username || !user.time) {
                throw new Error("User object is not structured as expected");
            }
        })
            .end(done);
    });
});
