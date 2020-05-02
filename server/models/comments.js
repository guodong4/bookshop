/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_comments',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		comment: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//评论时间
		comment_time: {
			type: Sequelize.DATE,
			allowNull: true
		},
		comment_star: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		comment_member_name:{
			type: Sequelize.STRING(255),
			allowNull: true
		},
		comment_book_name:{
			type: Sequelize.STRING(255),
			allowNull: true
		},
		comment_member_id:{
			type: Sequelize.STRING(255),
			allowNull: true
		},
		comment_book_id:{
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//回复
		comment_replay:{
			type: Sequelize.STRING(255),
			allowNull: true
		},
		comment_order_id:{
			type: Sequelize.STRING(50),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)