import request from "supertest";
import unprotectedRoutes from "../routes/unprotectedRoutes";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";
import Character from "../models/character";
import charactersData from "./wheresWaldoCharacterData";

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
