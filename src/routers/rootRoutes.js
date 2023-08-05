const login = require("../routers/Login/loginRoute")

function RouterRoot(app) {
    app.use("/api/services/login", login);
    app.use("/", (req, res, next) => {
        res.status(404).send("404 pages not found")
    })
}

module.exports = RouterRoot;