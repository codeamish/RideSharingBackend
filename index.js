/**
 * Main entry point for the MoveinSync application.
 * Initializes the Express server, sets up middleware, and defines routes.
 * @module index
 */

import express from "express";
import server from "./server.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./router/userRoutes.js";
import rideRouter from "./router/rideRoutes.js";

const app = new express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

/**
 * Mounts the userRouter middleware at the "/users" path.
 * @name app.use
 * @function
 * @param {string} "/users" - The path at which the userRouter middleware will be mounted.
 * @param {Function} userRouter - The userRouter middleware.
 */

app.use("/users", userRouter);

/**
 * Mounts the rideRouter middleware at the "/rides" path.
 * @name app.use
 * @function
 * @param {string} "/rides" - The path at which the rideRouter middleware will be mounted.
 * @param {Function} rideRouter - The rideRouter middleware.
 */

app.use("/rides", rideRouter);

// making adjcaceny list

const port = 3000;

/**
 * Starts the Express server and listens on the specified port.
 * @name app.listen
 * @function
 * @param {number} port - The port number on which the server will listen.
 * @param {Function} callback - The callback function to be executed when the server starts listening.
 */

app.listen(port, () => {
    console.log("App running on port 3000...");
});

export default app;