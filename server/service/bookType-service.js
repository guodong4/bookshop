var BookType = require('../models/bookType');
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
        var list = await BookType.findAll();
        return list;
    },
    save: async function (req, res) {
        if(!req.body.parent){
            var booktype = await BookType.findAll({ where: { type:req.body.type } });
            if(booktype.length!=0){
                return {
                    code: 0,
                    msg: "一级类别【"+req.body.type+"】已经存在"
                }
            }
        }
        var result = await BookType.create({ ...req.body, id: uuid.v1() });
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    update: async function (req, res) {
        var id = req.body.id;
        await BookType.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    findOne: async function (req, res) {
        var id = req.body.id;
        var result = await BookType.findAll({ where: { id } });
        return {
            code: 1,
            data: result[0].dataValues,
        };
    },
    delete: async function (req, res) {
        var id = req.body.id;
        await BookType.destroy({ where: { id } })
        return {
            code: 1,
            msg: "删除成功"
        };
    }
})
module.exports = Index;
