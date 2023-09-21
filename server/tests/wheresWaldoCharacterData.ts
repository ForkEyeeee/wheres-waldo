import mongoose from "mongoose";

const data = [
  {
    _id: new mongoose.Types.ObjectId("6509cadba2242a07b711b1a1"),
    name: "Waldo",
    locationXMax: 48,
    locationXMin: 44,
    locationYMax: 94,
    locationYMin: 90,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cf37a2242a07b711b1a2"),
    name: "Sonic The Hedgehog",
    locationXMin: 6,
    locationXMax: 79,
    locationYMax: 75,
    locationYMin: 2,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cfc7a2242a07b711b1a3"),
    name: "Death",
    locationXMin: 67,
    locationXMax: 10,
    locationYMin: 17,
    locationYMax: 61,
  },
];

export default data;
