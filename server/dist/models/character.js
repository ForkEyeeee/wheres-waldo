"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CharacterSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    locationXMin: { type: Number, required: true },
    locationXMax: { type: Number, required: true },
    locationYMin: { type: Number, required: true },
    locationYMax: { type: Number, required: true },
}, { collection: "characters" });
CharacterSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `${this._id}`;
});
const CharacterModel = (0, mongoose_1.model)("Character", CharacterSchema);
exports.default = CharacterModel;
