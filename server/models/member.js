/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_members',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		password: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		nickname: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		idcard: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		birthday: {
			type: Sequelize.DATE,
			allowNull: true
		},
		sex: {
			type: Sequelize.STRING(2),
			allowNull: true
		},
		telphone: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		status: {
			type: Sequelize.STRING(2),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)