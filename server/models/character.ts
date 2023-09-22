import { Schema, model } from "mongoose";

const CharacterSchema = new Schema(
  {
    name: { type: String, required: true },
    locationXMin: { type: Number, required: true },
    locationXMax: { type: Number, required: true },
    locationYMin: { type: Number, required: true },
    locationYMax: { type: Number, required: true },
  },
  { collection: "characters" }
);

CharacterSchema.virtual("url").get(function (this: any): string {
  // We don't use an arrow function as we'll need the this object
  return `${this._id}`;
});

const Character = model("Character", CharacterSchema);

export default Character;
