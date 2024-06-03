import express from "express";
import { loginController, logoutController, registerController } from "../connection/userConnection.js";

const router = express.Router()


router.post("/login",loginController)
router.post("/register",registerController)
router.get("/logout",logoutController)


export default router;