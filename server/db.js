
var Sequelize = require('sequelize');
// database数据库名称   name 用户  password密码
var sequelize = new Sequelize('bookshop', 'root', 'root', {
    host: 'localhost',  //数据库域名
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },define: {
        timestamps: false
    }
});
module.exports = sequelize;