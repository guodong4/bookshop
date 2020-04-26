/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_chapters',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		chapter: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		read_id: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		content: {
			type: Sequelize.TEXT,
			allowNull: true
		},
		parent: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
    }, {
		timestamps: false
	}
)