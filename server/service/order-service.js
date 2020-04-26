var Model = require('../models/order');
var Record = require('../models/record');
var OrderBook = require('../models/orderBook');
var Sequelize = require('sequelize');
const uuid = require('node-uuid');
var Op = Sequelize.Op;
function Index() {
    return this.init.apply(this, arguments);
}
Object.assign(Index.prototype, {
    init: function (req, res, method) {
        return this[method](req, res);
    },
    findAll: async function (req, res) {
        var order_number = req.body.order_number||"";
        var order_status = req.body.order_status||"";
        var pageSize = req.body.pageSize ? Number(req.body.pageSize) : 10;
        var page = req.body.page ? Number(req.body.page) : 1;
        var list = await Model.findAndCountAll({
            offset: pageSize * (page - 1),
            limit: pageSize,
            where: {
                order_number: { [Op.like]: '%' + order_number + '%' },
                order_status
            }
        });
        return {
            ...list,
            pageSize,
            page
        };
    },
    findRecordByOrderId: async function (req, res) {
        var id = req.body.order_id;
        var result = await Record.findAll({ where: { order_id:id } });
        return {
            code: 1,
            data: result,
        };
    },
    findBookByOrderId: async function (req, res) {
        var id = req.body.order_id;
        var result = await OrderBook.findAll({ where: { order_id:id } });
        return {
            code: 1,
            data: result,
        };
    },
    save: async function (req, res) {
        var result = await Model.create({ ...req.body, id: uuid.v1() });
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    update: async function (req, res) {
        var id = req.body.id;
        await Model.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    findOne: async function (req, res) {
        var id = req.body.id;
        var result = await Model.findAll({ where: { id } });
        return {
            code: 1,
            data: result[0].dataValues,
        };
    },
    delete: async function (req, res) {
        var id = req.body.id;
        await Model.destroy({ where: { id } })
        return {
            code: 1,
            msg: "删除成功"
        };
    }
})
module.exports = Index;
