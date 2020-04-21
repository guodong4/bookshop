/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_users',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		username: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		password: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		nickname: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		age: {
			type: Sequelize.STRING(11),
			allowNull: true
		},telphone: {
			type: Sequelize.STRING(255),
			allowNull: true
		},systemrule: {
			type: Sequelize.STRING(255),
			allowNull: true
		},idcard: {
			type: Sequelize.STRING(255),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)