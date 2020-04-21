module.exports = function (app) {
    app.use('/:module/:method', function (req, res) {
        var module = req.params.module;
        var method = req.params.method;
        var fn = require(`./service/${module}-service`);
        new fn(req,res,method).then(function(data){
            res.send(data)
        });
    });
};