# angularjs 学习例子

## 说明
### 用于学习angularjs，方便在公司和家里进行同步！

## 比较好的教程
- [Angularjs 官方 Api](https://docs.angularjs.org/api/ng)
- [官方项目](https://docs.angularjs.org/tutorial)
- [中文网站](http://www.angularjs.cn/T006)

##  笔记
1. 变量命名
以`$`变开头的变量是angular提供的服务，用户在命名变量时以你避免以此字符开头。注入某个作用域的变量，以`$$` 开头的变量一般认为是私有变量并且不应该被改变。

2. 关于压缩
如下形式的控制器在压缩时，可能会被替换成其他变量名，由于AngularJS是通过控制器构造函数的参数名字来推断依赖服务名称的，所以会导致出错。

```
    var PhoneListCtrl = functuion($http) { 
        /* constructor body */ 
    }
```

解决方法：
把要注入的服务放到一个字符串数组（代表依赖的名字）里，数组最后一个元素是控制器的方法函数：

```

    var PhoneListCtrl = ['$scope', '$http', function($scope, $http) { 
        /* constructor body */ 
    }];

```

3. jQuery
如果要结合jQuery使用，1.5版本的Angular不支持1.x的jQuery版本；同时jQuery的记载应该在Angular之前。如果存在外部的jQuery，则angular会采用外部的jQ，否则采用内部实现的jQlite。