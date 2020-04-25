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
		order_id: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		buy_num: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		book_name: {
			type: Sequelize.STRING(255),
			allowNull: true
		},book_img: {
			type: Sequelize.STRING(255),
			allowNull: true
		},book_price: {
			type: Sequelize.DECIMAL,
			allowNull: true
		},price_total: {
			type: Sequelize.DECIMAL,
			allowNull: true
		}
	}, {
	timestamps: false
}
)