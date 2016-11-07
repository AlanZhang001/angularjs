(function(angular) {
    'use strict';
     angular.module("demoDirective",[])
        .controller("myController",['$scope',function($scope){
            $scope.info = {
                name: 'Alan',
                age: '24'
            };
        }])
        .directive("myInfo",function(){
            return {
                template:'Name: {{info.name}} Age: {{info.age}}'
            };
        });
})(window.angular);