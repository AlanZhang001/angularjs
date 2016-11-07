(function(angular) {
    'use strict';
     angular.module("demoDirective",[])
        .controller("myController",['$scope',function($scope){
            $scope.info ={
                alan : {
                    name: 'Alan',
                    age: '24'
                },
                allen : {
                    name: 'Allen',
                    age: '25'
                }
            };
        }])
        .directive("myInfo",function(){
            return {
                restrict:"A",
                templateUrl: function(elem,attr){
                    return "info-"+attr.type+".html";
                }
            };
        });
})(window.angular);