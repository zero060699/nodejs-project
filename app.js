const express = require("express");
const app = express()
const RouterRoot = require("./src/routers/rootRoutes");
const db = require("./src/app/db/index");
const { connectMysql, initDatabaseMysql } = require("./src/app/db/mysql");


db.connect()

const port = 3001;

RouterRoot(app);

app.listen(port, () => {
    const start = async () => {
        try {
            await connectMysql();
            await initDatabaseMysql();
            console.log("connect success");
        } catch(error) {
            console.log(error?.message);
        }
    }
    start()
    console.log(`server listening at ${port}`);
})