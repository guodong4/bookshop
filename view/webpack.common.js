const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const PORT = 8001;
const HOST = "0.0.0.0";
// const localPublicPath = "http://" + HOST + ":" + PORT + "/";
const config = {
    entry: path.join(__dirname, 'src/index.js'),
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: ["vue-loader"]
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                exclude: "/node_modules/",
                loader: 'HappyPack/loader?id=js'
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg|jpg|png|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    externals:{
        
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        }
    },

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(['./dist','./Decision']),
        new HappyPack({
            id: 'js',
            use: ["babel-loader"]
        })
    ],
}
module.exports = config;