/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_order_records',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		record: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		record_time: {
			type: Sequelize.DATE,
			allowNull: true
		},
		order_id:{
			type: Sequelize.STRING(50),
			allowNull: true
		},
		record_user:{
			type: Sequelize.STRING(255),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)