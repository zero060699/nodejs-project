const dataLogin = require("../models/userLogin");
const crypto = require("crypto")
const bcrypt = require("bcrypt")

class loginService {
    async createLogin(user, password, name){
        try {
            const salt = crypto.randomBytes(128).toString('base64');
            const passwordHash = await bcrypt.hash(password, 10)
            const dateUser = Date.now();
            let data = {
                user: user,
                password: passwordHash,
                name: name,
                user_salt: salt,
                created_At: dateUser,
                update_At: dateUser,
                secret_key: ""
            }
            return new Promise(async (resolve, reject) => {
                try {
                    const result = await dataLogin.create(data);
                    if(!result) {
                        return reject(new Error("Create user failed"))
                    }
                    return resolve(result.get({plain:true}))
                } catch (error) {
                    return reject(error.message)
                }
            })
        } catch (error) {
            throw Error(error)
        }
    }

    async getUser(){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await dataLogin.findAll({
                    attributes: ["id","user", "name"]
                });
                if(!result) {
                    return reject(new Error("get user failed"))
                }
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        })
    }
}

module.exports = new loginService();