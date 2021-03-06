var Model = require('../models/users');
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
        var username = req.body.username || "";
        var telphone = req.body.telphone || "";
        var pageSize = req.body.pageSize ? Number(req.body.pageSize) : 10;
        var page = req.body.page ? Number(req.body.page) : 1;
        var list = await Model.findAndCountAll({
            offset: pageSize * (page - 1),
            limit: pageSize,
            where: {
                username: { [Op.like]: '%' + username + '%' },
                telphone: { [Op.like]: '%' + telphone + '%' },
            }
        });
        return {
            ...list,
            pageSize,
            page
        };
    },
    save: async function (req, res) {
        var user = await Model.findAll({ where: { username:req.body.username} });
        if(user.length!==0){
            return {
                code:0,
                data:[],
                msg:"已经存在账号为"+req.body.username
            };
        }else{
            var result = await Model.create({...req.body,id:uuid.v1()});
            return {
                code:1,
                data:result.dataValues,
                msg:"添加成功"
            };
        }
    },
    update: async function (req, res) {
        var id = req.body.id;
        await Model.update({...req.body},{ where: {id} });
        return {
            code:1,
            msg:"修改成功",
        };
    },
    updatePass: async function (req, res) {
        var id = req.body.id;
        await Model.update({password:req.body.password},{ where: {id} });
        return {
            code:1,
            msg:"修改成功",
        };
    },
    findOne: async function (req, res) {
        var id = req.body.id;
        var result = await Model.findAll({ where: { id} });
        return {
            code:1,
            data:result[0].dataValues,
        };
    },
    delete: async function (req, res) {
        var id = req.body.id;
        await Model.destroy({ where: { id } })
        return {
            code:1,
            msg:"删除成功"
        };
    },
    saveRule: async function (req, res) {
        var id = req.body.id;
        var systemrule = req.body.systemrule;
        await Model.update({systemrule},{ where: {id} });
        return {
            code:1,
            msg:"分配成功"
        };
    },
    login: async function (req, res) {
        var result = await Model.findAll({ where: req.body });
        if(result.length!==0){
            if(result[0].username===req.body.username&&result[0].password===req.body.password){
                return {
                    code:1,
                    data:result[0],
                };
            }
            return {
                code:0,
                data:{},
                msg:"账号和密码不对"
            };
        }
        return {
            code:0,
            data:{},
            msg:"账号和密码不对"
        };
    },
})
module.exports = Index;
