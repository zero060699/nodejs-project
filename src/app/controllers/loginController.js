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
            const responses = {
                search: req.body.search,
                page: req.body.page,
                size: req.body.size
            }
            const result = await loginService.getUser(
                responses.search,
                responses.page,
                responses.size
            );
            responseUtil.success200(res, jsonInstance.toJsonWithData("Get user success", result));
        } catch (error) {
            responseUtil.error400(res, jsonInstance.jsonNoData(error.message))
        }
    }

    async Login(req, res) {
        try {
            const responses = {
                user: req.body.user,
                passaword: req.body.password
            }
            const result = await loginService.login(
                responses.user,
                responses.passaword
            );
            responseUtil.success200(res, jsonInstance.jsonconfig("Login successfully", result));
        } catch (error) {
            responseUtil.error400(res, jsonInstance.jsondata(error.message))
        }
    }
}

module.exports = new loginController();