import express from "express";
import { getAllRides,getRides, createRide , poolRide } from "../controller/rideController.js";
const router = express.Router();

router.get("/",getAllRides);
router.get("/:userId",getRides);
router.post("/create",createRide);
router.post("/pool",poolRide);

export default router;