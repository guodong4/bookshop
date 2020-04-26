/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_books',
    {
        id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		//书名
		book_name: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//描述
		book_desc: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//单价
		book_price: {
			type: Sequelize.DECIMAL(10),
			allowNull: true
		},
		//原价
		book_old_price: {
			type: Sequelize.DECIMAL(10),
			allowNull: true
		},
		//图书封皮图
		book_img: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//作者
		book_author: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//出版社
		book_press: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//库存
		book_stock: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		//出版社
		book_press: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//出版时间
		book_press_time: {
			type: Sequelize.DATE,
			allowNull: true
		},
		//图书编码
		book_code: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//图书类别
		book_type: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//图书类别文字
		book_type_text: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//图书备注
		book_remarks: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//上架状态 0 下架  1 上架
		book_status: {
			type: Sequelize.STRING(2),
			allowNull: true
		},
		//发布时间
		book_publish_time: {
			type: Sequelize.DATE,
			allowNull: true
		},
		//销售数量
		seller_num:{
			type: Sequelize.INTEGER,
			allowNull: true
		}
    }, {
		timestamps: false
	}
)