import express from "express";
import deleteProfile from "../controllers/usercontroller/deleteProfile.controller.js";
import login from "../controllers/usercontroller/login.controller.js";
import register from "../controllers/usercontroller/register.controller.js";
import updateProfile from "../controllers/usercontroller/updateProfile.controller.js";
import verificationToken from "../middleware/verifyToken.middle.js";

const authRoute = express.Router();

authRoute.post("/register", register);

authRoute.post("/login", login);

authRoute.put("/update", verificationToken, updateProfile);

authRoute.delete("/delete", verificationToken, deleteProfile);

export default authRoute;
