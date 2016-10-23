# angularjs 学习例子

## 说明
### 用于学习angularjs，方便在公司和家里进行同步！

## 比较好的教程
- [Angularjs 官方 Api](https://docs.angularjs.org/api/ng)
- [官方项目](https://github.com/angular/angular-phonecat)

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