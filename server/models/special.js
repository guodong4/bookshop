/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_today_specials',
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
		book_name: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		book_img: {
			type: Sequelize.STRING(255),
			allowNull: true
        },
       //原价
		book_old_price: {
			type: Sequelize.DECIMAL(10),
			allowNull: true
		},
        book_price: {
            type: Sequelize.DECIMAL(10),
			allowNull: true
        },
		status:{
			type: Sequelize.STRING(2),
			allowNull: true
		},book_desc: {
			type: Sequelize.STRING(255),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)