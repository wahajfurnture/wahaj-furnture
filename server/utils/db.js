import { MongoClient } from "mongodb";
import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
const mongoClient = client.db();

export { mongoClient };

export default () =>
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Database connected successfully...");
    })
    .catch((err) => {
      console.log("Error: Failed to connect to database 💔");
      console.log(err);
      process.exit(1);
    });
