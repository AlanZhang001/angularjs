var webpackConfig = require('./webpack.config.js');
var extend = require("extend");
var webpack = require("webpack");
var gulp = require("gulp");
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

// 此处可扩展webpack的配置
webpackConfig = extend({}, webpackConfig, {
    watch: false,
    devtool: '#source-map'
});

webpackprodConfig = extend({}, webpackConfig, {
    plugins: [
        // 用于代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ]
});

// 打包
gulp.task("webpack", function (callback) {
    'use strict';
    webpack(webpackConfig, function () {
        console.log("END");
    });

    if (typeof callback === "function") {
        callback();
    }
});

// 打包
gulp.task("webpackprod", function (callback) {
    'use strict';
    webpack(webpackprodConfig, function () {
        console.log("END");
    });

    if (typeof callback === "function") {
        callback();
    }
});

// 清理现有文件
gulp.task('clean', function () {
    'use strict';
    return gulp.src(['./dist/**/*'], {
        read: false
    }).pipe(clean());
});

gulp.task("default", function(){
    return runSequence("clean","webpack");
});


gulp.task("prod",function(){
    return runSequence("clean","webpackprod");
});
