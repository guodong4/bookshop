var SequelizeAuto = require('sequelize-auto');
// database数据库名称   name 用户  password密码
var auto = new SequelizeAuto('bookshop', 'root', 'root', { 
    host: 'localhost',   //数据库地址
    dialect: 'mysql',  
    directory: './models',  //生成的模块放到的目录
    port: '3306',  //数据库端口
    additional: {
        timestamps: false
    }
})
auto.run(function (err) {
    if (err) throw err;
});