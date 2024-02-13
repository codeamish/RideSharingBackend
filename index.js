import express from "express";
import server from "./server.js";
const app = new express();
import userRouter from "./router/userRoutes.js";

app.use("/users", userRouter);

// making adjcaceny list

const port = 3000;

app.listen(port, () => {
    console.log("App running on port 3000...");
});


export default app;