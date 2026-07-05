import express from "express";
import connectDB from "./dbconnection.js";

const app = express();

connectDB();
app.listen(3000, () => {
  console.log("server running at 3000");
});
