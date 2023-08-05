const loginService = require("../service/loginService");
const responseUtil = require("../utils/ResponseUtils");
const jsonInstance = require("../utils/jsonUtils");
class loginController {
    async createUser(req, res) {
        try {
            const responses = {
                user: req?.body?.user,
                password: req?.body?.password,
                name: req?.body?.name   
            };
            const result = await loginService.createLogin(
                responses.user,
                responses.password,
                responses.name
            );
            responseUtil.success200(res, jsonInstance.jsondata("Create user success"))
        } catch (error) {
            responseUtil.error400(res, jsonInstance.jsonNoData(error.message))
        }
    }

    async getUser(req, res) {
        try {
            const result = await loginService.getUser();
            responseUtil.success200(res, jsonInstance.jsonconfig("Get user success", result));
        } catch (error) {
            responseUtil.error400(res, jsonInstance.jsonNoData(error.message))
        }
    }
}

module.exports = new loginController();