const merge = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");
let PORT = 8001;
const HOST = "0.0.0.0";
if (process.argv.indexOf("-P") > -1) {
    PORT = process.argv[process.argv.indexOf("-P") + 1] || PORT;
}
const localPublicPath = "http://" + HOST + ":" + PORT + "/";
const config = merge(common, {
    mode: "development", // 不压缩代码,加快编译速度
    devtool: "source-map", // 提供源码映射文件调试使用
    resolveLoader: {
        alias: {
            'scss-loader': 'sass-loader'
        }
    },
    
});
config.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: ["style-loader", "css-loader", "sass-loader"]
}, {
    test: /\.less$/,
    use: ["style-loader", 'css-loader', {
        loader: 'less-loader',
        options: {
            javascriptEnabled: true,
        }
    }],

});
// config.module.rules.push({
//     test: /\.(sa|sc|c)ss$/,
//     use: ["style-loader", "css-loader", "sass-loader"]
// });
// config.devtool = "eval-source-map";
config.output = {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[hash].js',
    publicPath: "/"
};
new WebpackDevServer(webpack(config), {
    hot: true,
    inline: false,
    compress: true,
    stats: {
        chunks: false,
        children: false,
        errorDetails: true,
        colors: true
    },
    historyApiFallback: true,
    disableHostCheck: true 
}).listen(PORT, HOST, function () {
    console.log(localPublicPath);
});
module.exports = config;