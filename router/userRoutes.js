/**
 * Express router for user routes.
 * @module userRoutes
 */

import express from "express";
import { getAllUsers } from "../controller/userController.js";
import { login, signup, restrictTo } from "../controller/authController.js";
import { updateMe } from "../controller/userController.js";

const router = express.Router();

/**
 * Route for getting all users.
 * @name GET /
 * @function
 * @memberof module:userRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with all users
 */
router.get("/", getAllUsers);

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @memberof module:userRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with login details
 */
router.post("/login", login);

/**
 * Route for user signup.
 * @name POST /signUp
 * @function
 * @memberof module:userRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with signup details
 */
router.post("/signUp", signup);

/**
 * Route for updating user details.
 * @name POST /updateMe
 * @function
 * @memberof module:userRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} - Response object with updated user details
 */

router.post("/updateMe", login, updateMe);

export default router;