import Ride from "../models/ride.js";
import adj from "../graph.js";
import { promisify } from "util";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
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

function shortestPath(source, destination) {
    // 1. Initialize all distances with infinity and mark all nodes unvisited
    const distances = {};
    const visited = new Set();
    const predecessors = {}; // New object to store predecessors
    for (let i = 0; i < adj.length; i++) {
      distances[i] = Infinity;
      visited.add(i);
      predecessors[i] = null; // Set all predecessors to null initially
    }
  
    // 2. Set distance from source to itself to 0
    distances[source] = 0;
  
    // 3. Main loop: repeatedly finding the closest unvisited node and updating distances
    while (visited.size > 0) {
      let closestNode = -1;
      let minDistance = Infinity;
  
      // Find the unvisited node with the smallest distance
      for (const node of visited) {
        if (distances[node] < minDistance) {
          closestNode = node;
          minDistance = distances[node];
        }
      }
  
      // Mark the closest node as visited
      visited.delete(closestNode);
  
      // 4. Update distances of adjacent nodes if a better path is found
      for (const [neighbor, weight] of adj[closestNode]) {
        const newDistance = distances[closestNode] + weight;
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          predecessors[neighbor] = closestNode; // Store the predecessor for this node
        }
      }
    }
  
    // 5. Reconstruct the shortest path from destination to source using predecessors
    const path = [];
    let current = destination;
    while (current !== null) {
      path.push(current);
      current = predecessors[current];
    }
  
    // 6. Reverse the path to get the order from source to destination
    path.reverse();
  
    // 7. Return the shortest distance and path
    // return { distance: distances[destination], path: path };
    return path;
  }

const poolRide = async (req, res)=> {
    try{
        let token = '';
        if (
            req.headers.authorization
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        console.log(token);
        const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
        const freshUser = await User.findById(decoded.id);
        console.log(freshUser);
        const rides = await Ride.find({status:`Ongoing`, isShared:null});
        const source = parseInt(req.body.from);
        // for(ride in rides){
        // for each loop
        let found = false;
        for(let ride of rides){
            const src = parseInt(ride.from);
            const dest = parseInt(ride.to);
            const path = shortestPath(src,dest);
            if(path.indexOf(source)!==-1){
                found = true;
                //TODO: update the ride with the user id and isShared
                // converting the decoded string to user object
                ride.isShared = freshUser;
                ride.save();
                res.status(200).json(ride);
            }
        }
        if(found ===false) throw new Error("No ride found");
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


export{
    getAllRides,
    getRides,
    createRide,
    poolRide,
    ridesByStatus
}