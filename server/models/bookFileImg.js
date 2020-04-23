/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_book_fileimgs',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		//图书id
		book_id: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//图片路径
		img_path: {
			type: Sequelize.STRING(255),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)