const express = require("express");
const app = express()

const port = 3001;
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