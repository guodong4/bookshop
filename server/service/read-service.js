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
    changeReadNum: async function (req, res) {
        var list = await Read.findAll({
            where: {
                id: req.body.read_id,
            }
        });
        await Read.update({read_num:list[0].read_num+1}, { where: { id:req.body.read_id } });
        return {code:1}
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
    findAllByType: async function (req, res) {
        var type = req.body.type;
        var pageSize = req.body.pageSize ? Number(req.body.pageSize) : 12;
        var page = req.body.page ? Number(req.body.page) : 1;
        var list = await Read.findAndCountAll({
            offset: pageSize * (page - 1),
            limit: pageSize,
            where:{
                type,
                status:1
            },
            order: [
                ["publish_time", "desc"]
            ]
        });
        return {
            ...list,
            pageSize,
            page
        };
    },
    getBookTop10: async function (req, res) {
        var type = req.body.type;
        var list = await Read.findAndCountAll({
            offset: 0,
            limit: 10,
            where:{
                type,
                status:1
            },
            order: [
                ["read_num", "desc"]
            ]
        });
        return list;
    },
    getRead: async function (req, res) {
        var read_id = req.body.read_id;
        var type = req.body.type;
        var member_id = req.body.member_id;
        if(type==1&&!member_id){
            return {
                code:0,
                msg:"未登录不能查阅会员书籍"
            }
        }
        var pageSize = req.body.pageSize ? Number(req.body.pageSize) : 1;
        var page = req.body.page ? Number(req.body.page) : 1;
        var list = await Chapter.findAndCountAll({
            offset: pageSize * (page - 1),
            limit: pageSize,
            where:{
                read_id,
                status:1
            }
        });
        return {
            ...list,
            pageSize,
            page
        };
    },
    findAllChapterContent: async function (req, res) {
        var list = await Chapter.findAll({
            where: {
                parent: req.body.parentId
            }
        });
        return list
    },
    findAllByContent: async function (req, res) {
        var content = req.body.content || "";
        var list = await Read.findAll({
            where: {
                status: 1,
                type:req.body.type,
                [Op.or]:{
                    title: { [Op.like]: '%' + content + '%' },
                    author: { [Op.like]: '%' + content + '%' }
                } 
            }
        });
        return list;
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
