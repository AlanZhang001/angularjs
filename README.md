# angularjs1.X 学习

## 说明
### 用于学习angularjs，方便在公司和家里进行同步！

## 比较好的教程
- [Angularjs 官方 Api](https://docs.angularjs.org/api/ng)
- [官方项目](https://docs.angularjs.org/tutorial)
- [中文网站](http://www.angularjs.cn/T006)
- Angularjs深度剖析与最佳实践[源码](https://github.com/ng-nice/code-book-forum)
- 开发指南[中文](http://docs.ngnice.com/guide),[英文](https://docs.angularjs.org/guide)

##  笔记
1. 变量命名
以`$`变开头的变量是angular提供的服务，用户在命名变量时以你避免以此字符开头。注入某个作用域的变量，以`$$` 开头的变量一般认为是私有变量并且不应该被改变。

3. jQuery
如果要结合jQuery使用，1.5版本的Angular不支持1.x的jQuery版本；同时jQuery的加载应该在Angular之前。如果存在外部的jQuery，则angular会采用外部的jQ，否则采用内部实现的jQlite。

4. Angularjs2.X 使用Typescript 和 ES6实现，不支持IE11以下的浏览器

5. 关于自定义directive.
    - html中使用"aa-bb"的方式，在js中需要使用"aaBb"的方式来指定directive。
    ```
    HTML:
    <div my-info></div>
    JS:
    directive("myInfo",function(){});
    ```
    - directive前缀不能使用ng，避免与angular内置的directive冲突
