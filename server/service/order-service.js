var Model = require('../models/order');
var Record = require('../models/record');
var OrderBook = require('../models/orderBook');
var Address = require('../models/address');
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
        var order_book = req.body.order_book;
        var order_number = uuid.v1();
        var result = await Model.create({ 
            id: uuid.v1(),
            order_price:req.body.order_price,
            member_id:req.body.member_id,
            member_name:req.body.member_name,
            order_time:new Date(),
            order_status:req.body.order_status,
            order_address:req.body.order_address,
            order_express:"",
            order_number:order_number,
            express_number:"",
            order_cancel_reason:"",
            return_express_number:"",
            return_express:""
        });
        order_book = JSON.parse(order_book);
        order_book.map(arr=>{
            OrderBook.create({ 
                id: uuid.v1(),
                book_id:arr.id,
                buy_num:arr.number,
                book_name:arr.book_name,
                book_img:arr.book_img,
                book_price:arr.book_price,
                order_number:order_number,
                price_total:arr.number*arr.book_price
            });
        });
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    saveAddress: async function (req, res) {
        var is_default = req.body.is_default;
        if(is_default==1){
            await Address.update({ is_default:"0" }, { where: { member_id:req.body.member_id} });
        }
        var result = await Address.create({ ...req.body, id: uuid.v1() });
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    updateAddress: async function (req, res) {
        var id = req.body.id;
        var is_default = req.body.is_default;
        if(is_default==1){
            await Address.update({ is_default:"0" }, { where: { member_id:req.body.member_id} });
        }
        await Address.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    getAddress: async function (req, res) {
        var id = req.body.member_id;
        var result = await Address.findAll({ where: { member_id:id } });
        return result;
    },
    findOneAddress: async function (req, res) {
        var id = req.body.id;
        var result = await Address.findAll({ where: { id:id } });
        return result[0]
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
