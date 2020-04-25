/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_carts',
	{
		id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		book_id: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		number: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		member_id: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
	}, {
	timestamps: false
}
)