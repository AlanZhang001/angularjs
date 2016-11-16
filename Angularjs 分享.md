# Angularjs 分享

## 一、angular的依赖注入原理
### 1. 什么IOC、DI，两者之间的关系是什么？
- 控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。
- 依赖注入（Dependency Injection，简称DI）是IOC的一种实现方式。

### 2. Angular的DI？

Angular的依赖注入可分为3种[DEMO](angular-share/IOC/injectDemo.html)：

- 内联数组注入的方式
```
myModule.controller('MyCtrl', ['$scope', function($scope, greeter) {
// doSomething
});
```
- $inject属性注入
```
var MyCtrl = function($scope) {
    // doSomething 
};
MyCtrl.$inject = ['$scope'];
myModule.controller('MyCtrl', MyCtrl);
```
- 查询注入
```
myModule.controller('MyCtrl', function($scope) {
  // ...
});
```

### 3. 如何自己实现一个DI的模型？
### 4. 使用DI的好处，以及对于我们编码的启示？


###  二、angularjs的AOP原理

###　三、angularjs的坑

#### 1. `angular.module("",[])`与`angular.module("")`。见[hole1](angular-share/hole01/index.html)

`angular.module('name', [])`是创建一个新的`module`，`[]`表示它没有依赖任何其他模块，如果已经有了一个同名模块，则会覆盖现有的。
而`angular.module('name')`是查找一个现有module，如果这个module不存在，则返回空值。

#### 2. 注入依赖的2中写法。见[hole2](angular-share/hole02/index.html).

代码压缩时，显示参数一般情况下都会被压缩成单个字母以便于节省空间，由于Angular是通过控制器构造函数的参数名字来推断依赖服务名称的，所以通过形参方式传入依赖注入方式将无法生效。**应尽量使用数组的方式传入依赖 ** 。

```
var Ctrl = ['$scope', '$http', function($scope, $http) {}];
var Ctrl =  function($scope, $http) {};
angular.module("moduleName",[]).controller("ctrlName",Ctrl)
```

Angular还提供提供了`ng-strict-di`标签来检测查找注入的方式，当ng-app所在标签使用了`ng-strict-di`,则会抛出异常。

```
<div ng-app="myApp" ng-controller="myControl" ng-strict-di>
```

#### 3. `ng-repeat`重复问题，见[hole3](angular-share/hole03/index.html)

为了尽可能少的去进行dom的渲染，`ngRepeat` 通过一个`keep track`方法来记录集合和对应的dom元素之间的映射关系。例如如果集合中增加了一个元素，那么`ng-repeat`只会渲染增加的dom，其他dom元素不会改变。而在记录映射关系的时候默认是通过元素实例来和dom元素形成一对一的映射关系的，因此默认情况下，出现相同元素时会报错。

通过`track by`来指定映射时的属性或者字段，可以避免这个问题。

```
<div ng-repeat="n in [42, 42, 43, 43] track by $index">
  {{n}}
</div>

<div ng-repeat="n in [42, 42, 43, 43] track by randomNum(n)">
  {{n}}
</div>
```

#### 4. 初始化时会显示{{}}表达式源码。见[hole4](angular-share/hole04/index.html)

当刷新页面时，在ng表示式还未计算出值时，会直接显示`{{something}}`, 通过`ng-clock`解决。将ng-cloak属性直接加载使用了表达式的元素上，或者是moudle上亦可。
同时必须为ng-cloak指定样式。

```
[ng\:cloak], [ng-cloak],[data-ng-cloak], [x-ng-cloak],.ng-cloak,.x-ng-cloak {
  display: none !important;
}
```

#### 5. ng-include的值问题。见[hole5](angular-share/hole05/index.html)

对于使用过php和jsp 中的include的人来说，很容易联想到到ng-include的用法；但是ng中，使用include包含外部的文件时，src必须为一个ng变量或者表达式，直接在scr中写入路径将不会起作用。

```
<ng-include src="./footer.html"></ng-include>
```

正确的方式是src指向一个在$scope中定义的变量

```
html:
<ng-include src="footer"></ng-include>

JS:
$scope.footer = "footer.html";
```

#### 6. 作用域问题[hole6](angular-share/hole06/index.html)

```
<div ng-controller="TestCtrl">
    <div ng-if="show">
        <input type="text" ng-model="name">
    </div>
    <p>your name is {{name}}</p>
</div>
```

在上面这段代码中，输入框内容的改变，下面p标签的内容并不会改变。
    搞清楚花这个问题，需要明白以下几点：

- 每个 Angular 应用默认有一个根作用域 `$rootScope`， 根作用域位于最顶层，从它往下挂着各级作用域。变量查找会通过原型继承向上查找。
- 并不是只有 Controller 可以创建作用域，`ng-repeat`、`ng-include`、`ng-switch`、`ng-view`、`ng-controller`等指令都会（隐式地）产生新作用域。并且进行原型继承。
- 原型继承时对变量的赋值不会修改原型中的值，而是直接在当前scope中创建一个同名的属性；但如果是变量是对象，则不会创建。

>**对于能创建作用域的指令，一般会在所在的dom元素上添加`ng-scope` 的`class`**。

 通过绑定父级作用域或者引用一个引用类型变量即可解决问题。所以$scope中的变量尽可能的以对象的方式出现。下面的绑定方式才能达到预期效果。

```
<div ng-if="show">
    <input type="text" ng-model="data.name">
</div>
<p>your name is {{data.name}}</p>
```

#### 7.ngOption 中的 value问题。见[hole7](angular-share/hole07/index.html)

- ng-options 所在select必须通过ng-model与 某个变量进行绑定，否则无效。


#### 8. 并不是所有的$scope属性的改变都能直接触发渲染[hole7](angular-share/hole08/index.html)

```
<div ng-app="myApp" ng-controller="myControl" ng-cloak>
    现在时间是{{ time.now | date:'yyyy-MM-dd HH:mm:ss Z'}}
</div>
<script type="text/javascript" src="../../angular.min.js"></script>
<script type="text/javascript">
    var app = angular.module("myApp",[]);
    app.controller('myControl',["$scope",function ($scope) {
        window.setInterval(function(){
            $scope.time = {
                now:new Date()
            };
        },800);
    }]);
</script>
```

上面代码并不会如期更新时间。
在angular环境之外执行的表达式如:`setTimeout`,`setInterval`,`XHR`等不会触发`digest`脏检测。`$apply`可以解决此类问题，`$apply`内部会调用eval方法，将所有要执行的函数在当前的scope中执行，并调用$digest脏检测并最终更新视图。
```
function $apply(expr) {
  try {
    return $eval(expr);
  } catch (e) {
    $exceptionHandler(e);
  } finally {
    $root.$digest();
  }
}
```

更加推荐的方式是使用angular内部实现的服务。
```
app.controller('myControl',"$interval",["$scope",function ($scope,$interval) {
    $interval(function(){
        $scope.time = {
            now:new Date()
        };
    },800);
}]);
```

#### 9. jQuery[hole09](angular-share/hole08/index.html)

angular内置了jqlite（简易版的jquery，见[API](https://docs.angularjs.org/api/ng/function/angular.element)）,开发时可能会存在借用jQuery的场景，比如动画。

- 如果要结合jQuery使用，1.5版本的Angular不推荐使用1.x的jQuery版本；
- 为了让angular能检测到jquery，jQuery的加载应该在Angular之前。
- 如果存在外部的jQuery，则angular会采用外部的jQ,同时会扩展`scope`、
`njector`等方法，否则采用内部实现的jQlite。

代码片段：

![](asserts/jquery.png)

>应尽量选择官方推荐的配置，否则这里出现问题也很难定位。

>Important: Be sure to use jQuery version 2.1 or newer, when using Angular 1.5; jQuery 1.x is not officially supported. In order for Angular to detect jQuery and take advantage of it, make sure to include jquery.js before angular.js.

>Angular 1.3+ technically requires at least jQuery 2.1+ but it may work with older versions. It will not work for sure with jQuery <1.7, though.



### 总结
你觉得坑多，主要还是文案看的少。

### 参考

- <https://docs.angularjs.org/guide/di>
- <https://docs.angularjs.org/api/ng/function/angular.element>
- <http://www.angularjs.cn/A09C>
- <http://www.alloyteam.com/2015/09/angularjs-study-of-dependency-injection/>
- <http://www.cnblogs.com/asnowwolf/p/3684700.html>
- <https://docs.angularjs.org/tutorial/step_14>