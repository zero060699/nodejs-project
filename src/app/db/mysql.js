const mysql = require("mysql2");
const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config?.mysql.database, config.mysql.user, config.mysql.password, {
    ...config,
    host: config?.mysqlSSO?.host || '127.0.0.1',
    port: config?.mysqlSSO?.port || 3306,
    dialect: 'mysql',
    logging: config?.mysqlSSO?.logging || false,
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
          host: config?.mysqlSSO?.host,
          user: config?.mysqlSSO?.user,
          password: config?.mysqlSSO?.password,
        });
        connection.query(
          `CREATE DATABASE IF NOT EXISTS ${config?.mysqlSSO?.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
          (error, results) => {
            connection.destroy();
            if (error) {
              console.log(`Init mysql database ${config?.mysqlSSO?.database} failed: ${error?.message || JSON.stringify(error)}`);
              return reject(error);
            }
            console.log(`Init mysql database ${config?.mysqlSSO?.database} successfully: ${JSON.stringify({results})}`);
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
