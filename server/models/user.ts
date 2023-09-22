import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, maxLength: 200 },
    time: { type: String, required: true },
  },
  { collection: "users" }
);

const User = model("User", UserSchema);

export default User;
