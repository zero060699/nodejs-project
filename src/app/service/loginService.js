const dataLogin = require("../models/userLogin");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class loginService {
  async createLogin(user, password, name) {
    try {
      const salt = crypto.randomBytes(128).toString("base64");
      const passwordHash = await bcrypt.hash(password, 10);
      const dateUser = Date.now();
      let data = {
        user: user,
        password: passwordHash,
        name: name,
        user_salt: salt,
        created_At: dateUser,
        update_At: dateUser,
        secret_key: "",
      };
      return new Promise(async (resolve, reject) => {
        try {
          const result = await dataLogin.create(data);
          if (!result) {
            return reject(new Error("Create user failed"));
          }
          return resolve(result.get({ plain: true }));
        } catch (error) {
          return reject(error.message);
        }
      });
    } catch (error) {
      throw Error(error);
    }
  }

  dataTotalPage(data, size) {
    if (size == undefined) {
      return 1;
    }
    const totalPage = data / size;
    if (Number.isInteger(totalPage)) {
      return totalPage;
    } else {
      const result = Math.floor(totalPage);
      return result + 1;
    }
  }

  async getUser(search = "", page = 1, perpage = 15) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dataLogin.findAll({
          where: {
            user: { [Op.like]: `%${search}%` }
          },
          attributes: ["id", "user", "name"],
          offset: parseInt((page -1) * perpage),
          limit: parseInt(perpage),
          raw: true,
        });
        if (!result) {
          return reject(new Error("get user failed"));
        }
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  }

  async login(username, password) {
    const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096
    })
    return new Promise(async (resolve, reject) => {
      try {
        const result = await dataLogin.findOne({
          where: {
            user: username
          }
        })
        if(!result) {
          return reject(new Error("Invalid username or password"))
        }
        if (bcrypt.compareSync(password, result.password)) {
          const accessToken = jwt.sign({userId: result.id}, privateKey, {algorithm:'RS256', expiresIn: '15s'});
          const resfreshToken = jwt.sign({userId: result.id}, privateKey, {algorithm:'RS256', expiresIn: '120s'})
          const publicToken = jwt.sign({userId: result.id}, publicKey, {algorithm:'RS256', expiresIn: '1h'})
          return resolve({accessToken, resfreshToken, publicToken})
        }else{
          return reject(new Error("Invalid username or password"))
        }
      } catch (error) {
        throw Error(error.message)
      }
    })
  }

  async token(refreshToken, username) {
    try {
      const refreshTokens = {}
      if(refreshToken && (refreshToken in refreshTokens)) {
        const user = await dataLogin.findOne({
          where: {
            user: username
          }
        })
        const token = jwt.sign({userId: result.id}, secretKey, {expiresIn: '15s'})
        refreshTokens[refreshToken] = token
      } else {
        throw new Error("Invalid request")
      }
    } catch (error) {
      throw Error(error.message)
    }
  }
}

module.exports = new loginService();
