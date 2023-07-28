const mysql = require("mysql2");
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config?.mysql.database, config.mysql.user, config.mysql.password, {
    ...config,
    host: config?.mysql?.host || '127.0.0.1',
    port: config?.mysql?.port || 3306,
    dialect: 'mysql',
    logging: config?.mysql?.logging || false,
});

async function connectMysql(){
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            force: false
        });
        console.log("Mysql connect successfully");
    } catch (error) {
        console.log(error.message);
    }
}

async function initDatabaseMysql() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
          host: config?.mysql?.host,
          user: config?.mysql?.user,
          password: config?.mysql?.password,
        });
        connection.query(
          `CREATE DATABASE IF NOT EXISTS ${config?.mysql?.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
          (error, results) => {
            connection.destroy();
            if (error) {
              console.log(`Init mysql database ${config?.mysql?.database} failed: ${error?.message || JSON.stringify(error)}`);
              return reject(error);
            }
            console.log(`Init mysql database ${config?.mysql?.database} successfully: ${JSON.stringify({results})}`);
            return resolve();
          }
        );
    });  
}

module.exports = {
    connectMysql,
    sequelize,
    initDatabaseMysql
}
