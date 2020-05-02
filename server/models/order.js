/* jshint indent: 1 */
var Sequelize = require('sequelize')  //引入sequelize模块
var db = require('../db')  //引入数据库
module.exports = db.define('t_orders',
	{
		id: {
			type: Sequelize.STRING(50),
			allowNull: false,
			primaryKey: true
		},
		order_price: {
			type: Sequelize.DECIMAL,
			allowNull: true
		},
		member_id: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		member_name: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		order_time: {
			type: Sequelize.DATE,
			allowNull: true
		},
		/*订单状态 
			0:"待付款",
			1:"已取消",
			2:"已付款",
			3:"已发货",
			4:"已收货",
			5:"申请退款",
			6:"申请退货退款",
			7:"申请通过",
			8:"退货中",
			9:"已完成"
		*/
		order_status: {
			type: Sequelize.STRING(2),
			allowNull: true
		},
		//地址
		order_address: {
			type: Sequelize.STRING(255),
			allowNull: true
		},
		//快递公司名称
		order_express: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//快递单号
		express_number: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//订单号
		order_number: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//取消订单原因
		order_cancel_reason: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//退货物流快递单号
		return_express_number: {
			type: Sequelize.STRING(50),
			allowNull: true
		},
		//退货快递公司
		return_express: {
			type: Sequelize.STRING(50),
			allowNull: true
		},//退货快递公司
		order_delete: {
			type: Sequelize.STRING(2),
			allowNull: true
		},
	}, {
	timestamps: false
}
)