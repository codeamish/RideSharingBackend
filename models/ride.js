/**
 * @fileoverview Defines the ride schema and model for the MoveinSync application.
 * @module Ride
 */

import mongoose from "mongoose";

/**
 * Represents a ride in the MoveinSync application.
 * @typedef {Object} Ride
 * @property {string} from - The starting location of the ride.
 * @property {string} to - The destination of the ride.
 * @property {string} status - The status of the ride. Can be "Booked", "Ongoing", or "Completed".
 * @property {mongoose.Schema.ObjectId} user - The user associated with the ride.
 * @property {mongoose.Schema.ObjectId} isShared - The user with whom the ride is shared. Default is null.
 * @property {string} cabNo - The cab number associated with the ride.
 * @property {Date} createdAt - The timestamp when the ride was created.
 * @property {Date} updatedAt - The timestamp when the ride was last updated.
 */

const rideSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Ongoing", "Completed"],
      default: "Booked",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    isShared: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      default: null,
    },
    cabNo:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

/**
 * Mongoose model for the Ride schema.
 * @type {mongoose.Model<Ride>}
 */
const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
