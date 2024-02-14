/**
 * Express router for handling ride routes.
 * @module rideRoutes
 */

import express from "express";
import { getAllRides,getRides, createRide , poolRide } from "../controller/rideController.js";

const router = express.Router();

/**
 * Route for getting all rides.
 * @name GET /
 * @function
 */
router.get("/",getAllRides);

/**
 * Route for getting rides by user ID.
 * @name GET /:userId
 * @function
 * @param {string} userId - The ID of the user.
 */
router.get("/:userId",getRides);

/**
 * Route for creating a new ride.
 * @name POST /create
 * @function
 */
router.post("/create",createRide);

/**
 * Route for pooling a ride.
 * @name POST /pool
 * @function
 */
router.post("/pool",poolRide);

export default router;
