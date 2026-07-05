import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.config.js";
import authController from "./controllers/auth.controller.js";
dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB();
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/auth/", authController);

app.listen(PORT, () => {
  console.log("server is running at 3000");
});
