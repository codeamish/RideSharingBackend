import Ride from "../models/ride.js";
import adj from "../graph.js";

const getAllRides = async (req, res) => {
    try {
        const rides = await Ride.find();
        res.status(200).json(rides);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getRides = async (req, res) => {
    try {
        const userId = req.params.userId;
        const rides = await Ride.find({user:`${userId}`});
        res.status(200).json(rides);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createRide = async (req, res) => {
    const ride = req.body;
    const newRide = new Ride(ride);
    try {
        await newRide.save();
        res.status(201).json(newRide);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const ridesByStatus = async (req, res) => {
    const status = req.params.status;
    try {
        const rides = await Ride.find({status:`${status}`});
        res.status(200).json(rides);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const poolRide = async (req, res) => {
    
}


export{
    getAllRides,
    getRides,
    createRide,
    poolRide,
    ridesByStatus
}