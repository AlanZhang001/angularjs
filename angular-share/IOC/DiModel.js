var DI = {
    // 保存依赖
    dependencies: {
        $http: {
            post: (data) => {
                console.info("post...",JSON.stringify(data));
            },
            get: (data) => {
                console.info("get",JSON.stringify(data));
            }
        }
    },
    // 注册依赖
    register: function (key, value) {

        this.dependencies[key] = vlaue;
    },
    // 获取服务
    getService: function(key) {

        return this.dependencies[key];
    },
    // 获取参数列表
    annotate: function(fn) {
        let FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
        let FN_ARG_SPLIT = /,/;
        let $inject = [];
        let argDecl = Function.prototype.toString.call(fn).match(FN_ARGS);

        argDecl[1].split(FN_ARG_SPLIT).forEach((name) => {
            $inject.push(name);
        });
        return $inject;
    },
    // 获取依赖列表
    injectionArgs: function(fn) {
        let $inject = this.annotate(fn);
        let args = [];

        $inject.forEach((item) => {
            args.push(this.getService(item));
        });

        return args;
    },
    // 注入依赖
    invoke: function(fn, context) {
        var args = this.injectionArgs(fn);
        fn.apply(context, args)
    }

};

class MyModule{

    constructor(name){
        this.moduleName = name;
    }
    controller(ctrl,fn){
        DI.invoke(fn);
    }
}

var mod = new MyModule("myApp");

mod.controller("myCtrl",function($http){
    $http.post({
        url:"/",
        data:{
            age:18
        }
    });
});