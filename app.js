const express = require("express");
const app = express()
const RouterRoot = require("./src/routers/rootRoutes");
const db = require("./src/app/db/index");


db.connect()

const port = 3001;

RouterRoot(app);

app.listen(port, () => {
    const start = async () => {
        try {
            console.log("connect success");
        } catch(error) {
            console.log(error?.message);
        }
    }
    start()
    console.log(`server listening at ${port}`);
})