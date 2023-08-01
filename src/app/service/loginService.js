const dataLogin = require("../models/userLogin");
const crypto = require("crypto")
const bcrypt = require("bcrypt")

class loginService {
    async createLogin(user, password, name){
        try {
            const salt = crypto.randomBytes(128).toString('base64');
            const passwordHash = bcrypt.hash(password)
            let data = {
                user: user,
                password: passwordHash,
                name: name,
                user_salt: salt,
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
}

module.exports = new loginService();