var Book = require('../models/book');
var Sequelize = require('sequelize');
var multer  = require('multer')
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
        var book_name = req.body.book_name || "";
        var book_author = req.body.book_author || "";
        var pageSize = req.body.pageSize ? Number(req.body.pageSize) : 10;
        var page = req.body.page ? Number(req.body.page) : 1;
        var list = await Book.findAndCountAll({
            offset: pageSize * (page - 1),
            limit: pageSize,
            where: {
                book_name: { [Op.like]: '%' + book_name + '%' },
                book_author: { [Op.like]: '%' + book_author + '%' },
            }
        });
        return {
            ...list,
            pageSize,
            page
        };
    },
    upload: async function (req, res) {
        
        console.log("==========");

        var upload1 = multer({dest:"uploads/"}).single('file');

        upload1(req, res, function (err) {
            if (err) {
                console.log(req.body);   //打印请求体
                console.log(req.file);   
              // An error occurred when uploading
              return
            }
            console.log(req.body);   //打印请求体
            console.log(req.file); 
        })
        // return {
        //     code: 1,
        //     data: {

        //     },
        //     msg: "上传成功"
        // };
    },
    save: async function (req, res) {
        var result = await Book.create({ ...req.body, id: uuid.v1() });
        return {
            code: 1,
            data: result.dataValues,
            msg: "添加成功"
        };
    },
    update: async function (req, res) {
        var id = req.body.id;
        await Book.update({ ...req.body }, { where: { id } });
        return {
            code: 1,
            msg: "修改成功",
        };
    },
    findOne: async function (req, res) {
        var id = req.body.id;
        var result = await Book.findAll({ where: { id } });
        return {
            code: 1,
            data: result[0].dataValues,
        };
    },
    delete: async function (req, res) {
        var id = req.body.id;
        await Book.destroy({ where: { id } })
        return {
            code: 1,
            msg: "删除成功"
        };
    }
})
module.exports = Index;
