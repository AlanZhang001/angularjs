var angular = require("angular");
var app = angular.module("myApp",[]);
app.controller('myControl',function ($scope) {
    $scope.firstName = "alan";
    $scope.secondName  = "zhang";
});