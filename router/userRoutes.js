import express from "express";
import {getAllUsers } from "../controller/userController.js"
import {login ,signup , restrictTo} from "../controller/authController.js"


const router = express.Router();

router.get("/",getAllUsers);
router.post("/login",login);
router.post("/signUp",signup);

export default router;