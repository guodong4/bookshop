/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_reads',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		author: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		publish_time: {
			type: Sequelize.DATE,
			allowNull: true
		},
		type:{
			type: Sequelize.STRING(2),
			allowNull: true
		},
		read_num:{
			type: Sequelize.INTEGER,
			allowNull: true
		},
		desc:{
			type: Sequelize.STRING(255),
			allowNull: true
		},
		book_img:{
			type: Sequelize.STRING(255),
			allowNull: true
		},
		status:{
			type: Sequelize.STRING(2),
			allowNull: true
		},
    }, {
		timestamps: false
	}
)