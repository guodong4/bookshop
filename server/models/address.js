/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_addresses',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		//地址
		address: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//电话
		phone_number: {
			type: Sequelize.STRING(20),
			allowNull: true
		},
		//收件人
		receiver: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//收件人
		member_id: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//收件人
		is_default: {
			type: Sequelize.STRING(2),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)