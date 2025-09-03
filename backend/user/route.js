import UserController from "./controller.js";
import express from "express";
import path from "path";

const router = express.Router();
const userController = new UserController();

router.get("/", (req, res) => {
  const filePath = path.resolve("frontend/frontend/index.html");
  res.sendFile(filePath);
});
router.post("/register", userController.createUser);
router.get("/verify", userController.verifyEmail);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.requestPasswordReset);
router.post("/reset-password/:token", userController.resetPassword);
router.get("/logout", userController.logoutUser);

export default router;
