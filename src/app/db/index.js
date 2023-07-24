const mongoose = require("mongoose");
const config = require("../config/config.json");

async function connect(){
    try {
        mongoose.connect(
            `mongodb://${config.mongoDB.host}:${config.mongoDB.port}/dataSharing`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connect MongoDB successfully");
    } catch (error) {
        console.log("Connect failure!!!");
    }
}

module.exports = {connect}