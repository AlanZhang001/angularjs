(function(angular) {
    "use strict";

    angular.module("myApp", [])
        .controller("myController", function($scope) {
            console.log($scope);
        })
        .directive("myTabs", [function() {
            return {
                restrict: 'E',
                transclude: true,
                scope: {},
                controller: ['$scope', function MyTabsController($scope) {
                    var panes = $scope.panes = [];

                    $scope.select = function(pane) {
                        angular.forEach(panes, function(pane) {
                            pane.selected = false;
                        });
                        pane.selected = true;
                    };

                    this.addPane = function(pane) {
                        if (panes.length === 0) {
                            $scope.select(pane);
                        }
                        panes.push(pane);
                    };
                }],
                templateUrl: 'my-tabs.html'
            };
        }])
        .directive("myPane", [function() {
            return {
                //myPane指令有一个require的选项，其值为:^myTabs.，
                //当指令使用这个选项，$compile服务会查找一个名叫myTabs的控制器，如果没有找到，就会抛出一个错误。
                //^^ 表示在父元素上查找，^前缀意味着指令将会在它的父元素或当前元素上面搜索控制器(如果没有^前缀，指令默认只在所属元素上搜索指定的控制器)。
                require: '^^myTabs',
                restrict: 'E',
                transclude: true,
                scope: {
                    title: '@',
                    type: "@"
                },
                link: function(scope, element, attrs, tabsCtrl) {
                    tabsCtrl.addPane(scope);
                },
                templateUrl: 'my-pane.html'
            };
        }]);

})(window.angular);