var Read = require('../models/read');
var Chapter = require('../models/chapter');
var Sequelize = require('sequelize');
var multer = require('multer')
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
        var title = req.body.title || "";
        var author = req.body.author || "";
        var pageSize = req.body.pageSize ? Number(req.body.pageSize) : 10;
        var page = req.body.page ? Number(req.body.page) : 1;
        var list = await Read.findAndCountAll({
            offset: pageSize * (page - 1),
            limit: pageSize,
            where: {
                title: { [Op.like]: '%' + title + '%' },
                author: { [Op.like]: '%' + author + '%' },
            }
        });
        return {
            ...list,
            pageSize,
            page
        };
    },
    findChapterByReadId: async function (req, res) {
        var list = await Chapter.findAll({
            where: {
                read_id: req.body.read_id,
                parent:""
            }
        });
        return list
    },
    findAllChapterContent: async function (req, res) {
        var list = await Chapter.findAll({
            where: {
                parent: req.body.parentId
            }
        });
        return list
    },
    
    save: async function (req, res) {
        var result = await Read.create({ ...req.body, id: uuid.v1()});
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    saveChapter: async function (req, res) {
        var result = await Chapter.create({ ...req.body, content:"",parent:"" ,id: uuid.v1()});
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    addChapterContent: async function (req, res) {
        var result = await Chapter.create({ ...req.body, id: uuid.v1()});
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    updateChapterContent: async function (req, res) {
        var id = req.body.id;
        await Chapter.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    update: async function (req, res) {
        var id = req.body.id;
        await Read.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    updateChapter: async function (req, res) {
        var id = req.body.id;
        await Chapter.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    
    findOne: async function (req, res) {
        var id = req.body.id;
        var result = await Read.findAll({ where: { id } });
        return {
            code: 1,
            data: result[0].dataValues,
        };
    },
    delete: async function (req, res) {
        var id = req.body.id;
        await Read.destroy({ where: { id } })
        await Chapter.destroy({ where: { read_id:id } })
        return {
            code: 1,
            msg: "删除成功"
        };
    },
    deleteChapter: async function (req, res) {
        var id = req.body.id;
        await Chapter.destroy({ where: { id } })
        await Chapter.destroy({ where: { parent:id } })
        return {
            code: 1,
            msg: "删除成功"
        };
    }
})
module.exports = Index;
