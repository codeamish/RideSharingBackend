import mongoose from "mongoose";

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
    // date: {
    //   type: Date,
    //   required: true,
    // },
    // time: {
    //   type: String,
    //   required: true,
    // },
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
const Ride = mongoose.model("Ride", rideSchema);
export default Ride;
