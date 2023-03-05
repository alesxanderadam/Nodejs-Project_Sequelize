// kết nối CSDL
const { Sequelize } = require('sequelize');
const config = require("../config/index");
const sequelize = new Sequelize(config.database, config.user, config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect // hệ CSDL đang sử dụng 
    })
module.exports = sequelize;
