var Module = require('../models/module');
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
        var list = await Module.findAll();
        console.log(list);
        return {
            code:1,
            data:list
        }
    },
})
module.exports = Index;   