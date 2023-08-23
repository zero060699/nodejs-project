const login = require("../routers/Login/loginRoute")
const loginUser = require("../routers/Login/login")

function RouterRoot(app) {
    app.use("/api/services/loginUser", login);
    app.use("/api/services/login", loginUser);
    app.use("/", (req, res, next) => {
        res.status(404).send("404 pages not found")
    })
}

module.exports = RouterRoot;