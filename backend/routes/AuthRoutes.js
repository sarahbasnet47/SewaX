import express from "express";
import {
  deleteUser,
  getAllUser,
  getCurrentUser,
  LoginUser,
  logout,
  registerUser,
  updateUser,
} from "../controllers/Authcontroller.js";
import { islogin } from "../middleware/islogin.js";
import { isAdmin } from "../middleware/isAdmin.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", LoginUser);

AuthRouter.get("/getAlluser", islogin, isAdmin, getAllUser);

AuthRouter.post("/logout", logout);

AuthRouter.get("/getuser", islogin, getCurrentUser);

AuthRouter.put("/update/:id", updateUser);
AuthRouter.delete("/delete/:id", islogin,isAdmin,deleteUser);

export default AuthRouter;
