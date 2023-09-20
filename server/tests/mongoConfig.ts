/// mongoConfig.js
import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";

const mongoDb: any = process.env.dev_db_url;

mongoose.connect(mongoDb, { useNewUrlParser: true } as ConnectOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
