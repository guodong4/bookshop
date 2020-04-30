var Model = require('../models/likes');
var Book = require('../models/book');
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
        var pageSize = req.body.pageSize ? Number(req.body.pageSize) : 10;
        var page = req.body.page ? Number(req.body.page) : 1;
        var list = await Model.findAndCountAll({
            offset: pageSize * (page - 1),
            limit: pageSize,
            'order': [
                ["comment_replay", "asc"]
            ]
        });
        return {
            ...list,
            pageSize,
            page
        };
    },
    findLikeByMember: async function (req, res) {
        var member_id = req.body.member_id;
        var result = await Model.findAll({ where: { member_id } });
        var ids = result.map(arr => { 
            return arr.book_id 
        });
        var booklist = await Book.findAll({
            where: {
                id: { [Op.in]: ids },
            }
        });
        return booklist.map(arr=>{ 
            result.map(item=>{
                if(arr.id==item.book_id){
                    arr.dataValues.like_id = item.dataValues.id;
                }
            });
            return arr.dataValues;
        });
    },
    addLike: async function (req, res) {
        var cartslist = await Model.findAll({
            where: {
                book_id: req.body.book_id,
                member_id:req.body.member_id
            }
        });
        if(cartslist.length>=1){
            return {
                code: 1,
                msg: "已收藏"
            };
        }else{
            await Model.create({ ...req.body, id: uuid.v1() });
            return {
                code: 1,
                msg: "收藏成功"
            };
        }
    },
    update: async function (req, res) {
        var id = req.body.id;
        await Model.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    replay: async function (req, res) {
        var id = req.body.id;
        await Model.update({ comment_replay: req.body.comment_replay }, { where: { id } });
        return {
            code: 1,
            msg: "回复成功",
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
