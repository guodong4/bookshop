var express = require("express");
var path = require("path");
// var bodyParser = require("body-parser");
//var favicon = require('serve-favicon');

// var routes = express.Router();

var app = express();
const history = require('connect-history-api-fallback')

app.set("views", __dirname);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "dist")));
app.use(history({
    rewrites: [
        {
            from: /^\/.*$/,
            to: function (context) {
                return "/";
            }
        },
    ]
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(process.cwd(), "dist/index.html"));
});
// 404
app.use("*", function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

module.exports = app;
