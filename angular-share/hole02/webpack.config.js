var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: {
        index: './index.js'
    },
    output: {
        path: path.join(__dirname,"dist"),

        // name,hash在此处为占位符 见：http://webpack.toobug.net/zh-cn/chapter3/config.html
        filename: '[name].js'
    },
    externals:{
        "angular":"angular"
    },
    plugins: [
        // 用于代码压缩
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false
        //     }
        // })
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.(png|jpg)$/,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    resolve: {
        modulesDirectories: ["./node_modules"]
    },
    watch: false
};