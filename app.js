const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const RouterRoot = require("./src/routers/rootRoutes");
const db = require("./src/app/db/index");
const { connectMysql, initDatabaseMysql } = require("./src/app/db/mysql");

app.use(cors());

db.connect();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,applicatio n/x-www-form-urlencoded"
  );
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT, PATCH, POST, PUT, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
});

const port = 3001;

RouterRoot(app);

app.listen(port, () => {
  const start = async () => {
    try {
      await connectMysql();
      await initDatabaseMysql();
      console.log("connect success");
    } catch (error) {
      console.log(error?.message);
    }
  };
  start();
  console.log(`server listening at ${port}`);
});
