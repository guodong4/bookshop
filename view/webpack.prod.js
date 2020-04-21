const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const config = merge(common, {
    mode: "production"// 压缩代码
});
config.output = {
    filename: 'js/[name].[hash].js',
    publicPath: "/Decision/",
    path: __dirname + '/Decision',
    chunkFilename: 'js/[name].[hash].js'
};
config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
        MiniCssExtractPlugin.loader,
        { loader: "css-loader" },
        { loader: "sass-loader" }
    ]
}, {
    test: /\.less$/,
    use: ["style-loader", 'css-loader', {
        loader: 'less-loader',
        options: {
            javascriptEnabled: true,
            modifyVars: {

            }
        }
    }],

});
config.plugins.push(
    new MiniCssExtractPlugin({
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[id].[hash].css"
    })
);

module.exports = config;
