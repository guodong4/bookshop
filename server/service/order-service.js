var Model = require('../models/order');
var Book = require('../models/book');
var Carts = require('../models/carts');
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
                order_status:{[Op.like]: '%' + order_status + '%'}
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
        var order_number = req.body.order_number;
        var result = await OrderBook.findAll({ where: { order_number } });
        return {
            code: 1,
            data: result,
        };
    },
    save: async function (req, res) {
        var order_book = req.body.order_book;
        var order_number = uuid.v1();
        var order_id = uuid.v1();
        //生成订单
        var result = await Model.create({ 
            id: order_id,
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
        //订单里的商品详细
        order_book = JSON.parse(order_book);
        order_book.map(arr=>{
            //需要把购物车已经生成订单的商品删除
            Carts.destroy({ where: { book_id:arr.id,member_id:req.body.member_id } });
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
        //记录订单操作记录
        Record.create({ 
            id: uuid.v1(),
            record:"创建订单",
            record_time:new Date(),
            order_id:order_id,
            record_user:req.body.member_id
        });
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },

    findByStatus:async function (req, res) {
        var member_id = req.body.member_id;
        var order_status = req.body.order_status;
        var result = await Model.findAll({ where: { 
            order_delete:{[Op.or]: [null,""]},
            member_id,
            order_status:{[Op.like]: '%' + order_status + '%'},
         } });
        var numbers = result.map(arr => { 
            return arr.order_number 
        });
        var booklist = await OrderBook.findAll({
            where: {
                order_number: { [Op.in]: numbers },
            }
        });
        return result.map(arr=>{
            booklist.map(item=>{
                if(arr.order_number==item.order_number){
                    arr.dataValues.child=arr.dataValues.child||[];
                    arr.dataValues.child.push(item.dataValues)
                }
            });
            return arr.dataValues;
        })
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
    payOrder: async function (req, res) {
        var order_number = req.body.order_number;
        var booklist = await OrderBook.findAll({
            where: {
                order_number,
            }
        });
        booklist.map(arr=>{
            var book_id = arr.dataValues.book_id;
            var buynum = arr.dataValues.buy_num;
            Book.findAll({
                where: {
                    id:book_id
                }
            }).then(data=>{
                var num = data[0].dataValues.seller_num;
                Book.update({ seller_num:Number(num||0)+Number(buynum)}, { where: { id:book_id } });
            })
        })
        await Model.update({ order_status:"2" }, { where: { order_number } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    updateStatus: async function (req, res) {
        var id = req.body.id;
        if(req.body.order_status==2){
            Record.create({ 
                id: uuid.v1(),
                record:"已取消",
                record_time:new Date(),
                order_id:id,
                record_user:req.body.member_id
            });
        }
        if(req.body.order_status==3){
            Record.create({ 
                id: uuid.v1(),
                record:"已发货",
                record_time:new Date(),
                order_id:id,
                record_user:"管理员"
            });
        }
        if(req.body.order_status==4){
            Record.create({ 
                id: uuid.v1(),
                record:"已收货",
                record_time:new Date(),
                order_id:id,
                record_user:req.body.member_id
            });
        }
        if(req.body.order_status==5){
            Record.create({ 
                id: uuid.v1(),
                record:"申请退款",
                record_time:new Date(),
                order_id:id,
                record_user:req.body.member_id
            });
        }
        if(req.body.order_status==6){
            Record.create({ 
                id: uuid.v1(),
                record:"申请退货并退款",
                record_time:new Date(),
                order_id:id,
                record_user:req.body.member_id
            });
        }
        if(req.body.order_status==7){
            Record.create({ 
                id: uuid.v1(),
                record:"申请退单成功",
                record_time:new Date(),
                order_id:id,
                record_user:"管理员"
            });
        }
        if(req.body.order_status==8){
            Record.create({ 
                id: uuid.v1(),
                record:"退货中",
                record_time:new Date(),
                order_id:id,
                record_user:req.body.member_id
            });
        }
        if(req.body.order_status==9){
            Record.create({ 
                id: uuid.v1(),
                record:"已完成",
                record_time:new Date(),
                order_id:id,
                record_user:"管理员"
            });
        }
        await Model.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "操作成功",
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
        await Model.update({order_delete:1 }, { where: { id } });
        return {
            code: 1,
            msg: "删除成功"
        };
    }
})
module.exports = Index;
