const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CharacterSchema = new Schema(
  {
    name: { type: String, required: true },
    locationX: { type: Number, required: true },
    locationY: { type: Number, required: true },
  },
  { collection: "characters" }
);

CharacterSchema.virtual("url").get(function (this: any): string {
  // We don't use an arrow function as we'll need the this object
  return `${this._id}`;
});

module.exports = mongoose.model("Character", CharacterSchema);
