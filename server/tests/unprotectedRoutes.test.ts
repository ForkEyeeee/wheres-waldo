import request from "supertest";
import unprotectedRoutes from "../routes/unprotectedRoutes";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";
import Character from "../models/character";
import data from "./wheresWaldoCharacterData";

const appTest = expressTest();

mongoTestingServer();

appTest.use(expressTest.urlencoded({ extended: false }));
appTest.use(expressTest.json());
appTest.use("/", unprotectedRoutes);

describe("Character API tests", () => {
  beforeEach(async () => {
    await Character.insertMany(data);
  });

  afterEach(async () => {
    await Character.deleteMany();
  });

  describe("unprotectedRoutes", function () {
    it("should return jwt information", function (done) {
      request(appTest)
        .patch("/")
        .send({
          userId: "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9",
        })
        .set("Accept", "application/json")
        .expect(200)
        .expect(function (res) {
          if (res.body.data.userId !== "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9") {
            throw new Error(
              `Expected userId to be '7f43e3a0-cbc9-4dc5-9892-e61250bba7c9', got ${res.body.userId}`
            );
          }
        })
        .end(done);
    });

    test("unprotectedRoutes", done => {
      request(appTest)
        .post("/")
        .send({ character: "Waldo", pageX: 46, pageY: 91 })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect({ success: true })
        .expect((res: any) => {
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
