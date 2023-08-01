const loginService = require("../service/loginService");
const responseUtil = require("../utils/ResponseUtils");
const jsonInstance = require("../utils/jsonUtils");
class loginController {
    async createUser(req, res) {
        const response = {
            user: req.body.user,
            password: req.body.password,
            name: req.body.name   
        };
        try {
            const result = await loginService.createLogin(
                response.user,
                response.password,
                response.name
            );
            responseUtil.success200(res, jsonInstance.jsondata("Create user success"))
        } catch (error) {
            responseUtil.error400(res, jsonInstance.jsonNoData(error.message))
        }
    }
}

module.exports = new loginController();