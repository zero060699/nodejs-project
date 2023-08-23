const jwt = require('jsonwebtoken')
const secretToken = require("../service/loginService");
module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const accessToken = secretToken.login()
    if (token) {
        jwt.verify(token, accessToken?.publicToken, function(err, decoded){
            if (err) {
                return res.status(401).json({"error": true, "message": 'Unauthorized access.', err });
            }
            console.log(`decoded>>${decoded}`);
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            "error": true,
            "message": "No token provided"
        })
    }
}