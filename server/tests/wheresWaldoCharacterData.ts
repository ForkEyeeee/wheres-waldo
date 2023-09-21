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
    locationXMax: 6,
    locationYMax: 79,
    locationYMin: 75,
    locationXMin: 2,
  },
  {
    _id: new mongoose.Types.ObjectId("6509cfc7a2242a07b711b1a3"),
    name: "Death",
    locationXMax: 67,
    locationYMin: 10,
    locationYMax: 17,
    locationXMin: 61,
  },
];

export default data;
