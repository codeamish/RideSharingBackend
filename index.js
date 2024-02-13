import express from "express";

const app = new express();

const port = 3000;

app.listen(port, () => {
    console.log("App running on port 3000...");
});


export default app;