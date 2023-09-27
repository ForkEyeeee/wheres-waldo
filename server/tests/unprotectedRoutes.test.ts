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

beforeEach(async () => {
  await Character.insertMany(data);
});

afterEach(async () => {
  await Character.deleteMany();
});

describe("unprotectedRoutes", function () {
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

  test("updateTimePut", done => {
    request(appTest)
      .patch("/")
      .send({ userId: "7f43e3a0-cbc9-4dc5-9892-e61250bba7c9" })
      .end((err, res) => {
        if (err) return done(err);

        const token = res.body.data.token;
        request(appTest)
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
    request(appTest)
      .get("/leaderboard")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect(function (res) {
        if (!res.body.success) {
          throw new Error(
            `Expected success to be true, got ${res.body.success}`
          );
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
