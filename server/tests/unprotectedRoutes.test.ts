import request from "supertest";
import unprotectedRoutes from "../routes/unprotectedRoutes";
import expressTest from "express";
import mongoTestingServer from "./mongoConfigTesting";
import Character from "../models/character";
import data from "./wheresWaldoCharacterData";

const appTest = expressTest();

mongoTestingServer();

appTest.use(expressTest.urlencoded({ extended: false }));
appTest.use("/", unprotectedRoutes);

describe("Character API tests", () => {
  beforeEach(async () => {
    await Character.insertMany(data);
    let characters = await Character.find({});
    console.log(characters);
  });

  afterEach(async () => {
    await Character.deleteMany();
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
