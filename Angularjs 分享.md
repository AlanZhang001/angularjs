## Angularjs 分享

### 一、angular的依赖注入原理
	- http://www.alloyteam.com/2015/09/angularjs-study-of-dependency-injection/
	- http://www.cnblogs.com/asnowwolf/p/3684700.html


###  二、angularjs的AOP原理

###　三、angularjs最佳实践

###  四、angularjs的坑
    
1. `angular.module("",[])`与`angular.module("")`。见[hole1](angular-share/hole01/index.html)

    `angular.module('name', [])`是创建一个新的`module`，`[]`表示它没有依赖任何其他模块，如果已经有了一个同名模块，则会覆盖现有的。
    而`angular.module('name')`是查找一个现有module，如果这个module不存在，则返回空值。

2. 注入依赖的2中写法。见[hole2](angular-share/hole02/index.html).

    代码压缩时，显示参数一般情况下都会被压缩成单个字母以便于节省空间，由于Angular是通过控制器构造函数的参数名字来推断依赖服务名称的，所以通过形参方式传入依赖注入方式将无法生效。**应尽量使用数组的方式传入依赖 ** 。

    ```

        var Ctrl = ['$scope', '$http', function($scope, $http) {}];
        var Ctrl =  function($scope, $http) {};
        angular.module("moduleName",[]).controller("ctrlName",Ctrl)

    ```

3. ng-repeat重复问题，见[hole3](angular-share/hole03/index.html)

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

4. 初始化时会显示{{}}表达式源码。见[hole4](angular-share/hole04/index.html)

    当刷新页面时，在ng表示式还未计算出值时，会直接显示`{{something}}`, 通过`ng-clock`解决。将ng-cloak属性直接加载使用了表达式的元素上，或者是moudle上亦可。
    同时必须为ng-cloak指定样式。

    ```
    [ng\:cloak], [ng-cloak],[data-ng-cloak], [x-ng-cloak],.ng-cloak,.x-ng-cloak {
      display: none !important;
    }
    ```

5. ng-include的值问题。见[hole5](angular-share/hole05/index.html)

    对于使用过php和jsp 中的include的人来说，很容易联想到到ng-include的用法；但是ng中，使用include包含外部的文件时，src必须为一个ng变量或者表达式，直接在scr中写入路径将不会起作用。

    ```
    <ng-include src="./footer.html"></ng-include>
    ```


6. 作用域的原型继承问题

7. ngOption 中的 value问题。见[hole7](angular-share/hole07/index.html)
    - ng-options 所在select必须通过ng-model与 某个变量进行绑定，否则无效。

8. 独立作用域问题

### 参考
