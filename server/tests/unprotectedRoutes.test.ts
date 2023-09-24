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
  beforeAll(async () => {
    await Character.insertMany(data);
  });

  afterEach(async () => {
    await Character.deleteMany();
  });

  test("validateLocationPost", done => {
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

test("updateTimePutInitial", done => {
  request(appTest)
    .put("/")
    .send({
      time: 1695516900,
    })
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({ Message: 1695516900, success: true })
    .expect((res: any) => {
      if (res.body === undefined) {
        throw new Error("Expected response body to be true or false");
      }
    })
    .end(done);
});

test("updateTimePutEnd", done => {
  request(appTest)
    .put("/")
    .send({
      time: 1695516950,
      name: "Jeff",
    })
    .expect(200)
    .expect("Content-Type", /json/)
    .expect({ elapsedTime: 50, success: true })
    .expect((res: any) => {
      if (res.body === undefined) {
        throw new Error("Expected response body to be true or false");
      }
    })
    .end(done);
});
