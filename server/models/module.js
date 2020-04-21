/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_modules',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		modulename: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		parent: {
			type: Sequelize.STRING(50),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)