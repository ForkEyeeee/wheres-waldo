const request = require("supertest");
const unprotectedRoutes = require("../routes/unprotectedRoutes");
const expressTest = require("express");
const mongoTestingServer = require("./mongoConfigTesting");
const Character = require("../models/character");
const charactersData = require("./wheres-waldo.characters");
const appTest = expressTest();

mongoTestingServer();

appTest.use(expressTest.urlencoded({ extended: false }));
appTest.use("/", unprotectedRoutes);

describe("Character API tests", () => {
  beforeEach(async () => {
    await Character.insertMany(charactersData);
  });

  afterEach(async () => {
    await Character.deleteMany();
  });

  test("unprotectedRoutes", done => {
    request(appTest)
      .post("/")
      .send({ pageX: 890, pageY: 430 })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res: any) => {
        if (res.body.Message === undefined) {
          throw new Error("Expected response body to be true or false");
        }
      })
      .end(done);
  });
});
