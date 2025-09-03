import UserController from "./controller.js";
import express from "express";

const router = express.Router();
const userController = new UserController()

router.post("/register", userController.createUser);
router.get("/verify/:token", userController.verifyEmail);
router.post("/login", userController.loginUser);
router.post("/password-reset-request", userController.requestPasswordReset);
router.post("/reset-password/:token", userController.resetPassword);
router.get("/logout", userController.logoutUser);

export default router;
