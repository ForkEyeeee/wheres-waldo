import mongoose from "mongoose";

const data = [
  {
    _id: new mongoose.Types.ObjectId("6509cadba2242a07b711b1a1"),
    name: "Waldo",
    locationXMax: 920,
    locationXMin: 860,
    locationYMax: 450,
    locationYMin: 380,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cf37a2242a07b711b1a2"),
    name: "Wenda",
    locationXMin: 1080,
    locationXMax: 1120,
    locationYMax: 460,
    locationYMin: 410,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cfc7a2242a07b711b1a3"),
    name: "Whitebeard",
    locationXMin: 360,
    locationXMax: 410,
    locationYMin: 360,
    locationYMax: 430,
  },
];

export default data;