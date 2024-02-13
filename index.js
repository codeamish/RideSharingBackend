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


app.use("/users", userRouter);
app.use("/rides", rideRouter);

// making adjcaceny list

const port = 3000;

app.listen(port, () => {
    console.log("App running on port 3000...");
});


export default app;