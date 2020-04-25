/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_ads',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		//广告图片地址
		img_path: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//广告链接
		url: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//广告类型，1 长图  2 小图
		type: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//上架状态
		status:{
			type: Sequelize.STRING(2),
			allowNull: true
		},
		//广告描述
		desc:{
			type: Sequelize.STRING(255),
			allowNull: true
		}
    }, {
		timestamps: false
	}
)