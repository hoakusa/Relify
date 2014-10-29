var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngAnimate'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

// header
app.controller("HeaderController", function($scope, $http) {
    
});

// navigation 
app.controller("NavigationController", function($scope, $http) {
    $scope.tabs = [
        {name: "Activity", link: "#", active: false},
        {name: "Tasks", link: "tasks", active: false},
        {name: "Members", link: "members", active: false},
        {name: "Notes", link: "notes", active: false}
    ];

    $scope.set_route = function(id) {
        for (var i = 0; i < $scope.tabs.length(); i++) {
            $scope.tabs[i].active = false;
        }
        $scope.tabs[id].active = true;
        $scope.tab = $scope.tabs[id].active;
    };
});

// home page
app.controller("HomeController", function($scope, $http) {

});

// main page
app.controller("MainController", function($scope, $http) {
    angular.element($("#navigation")).scope().set_route(0);
});

// tasks page
app.controller("TasksController", function($scope, $http) {

    angular.element($("#navigation")).scope().set_route(1);
});

// members page
app.controller("MembersController", function($scope, $http) {
    angular.element($("#navigation")).scope().set_route(2);
});

// notes page
app.controller("NotesController", function($scope, $http) {
    angular.element($("#navigation")).scope().set_route(3);
});

// route setting
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'template/project_list.html',
            controller  : 'HomeController'
        })
        // route for the main page
        .when('/project_name', {
            templateUrl : 'template/project.html',
            controller  : 'MainController'
        })
        .when('/project_name/tasks', {
            templateUrl : 'template/tasks.html',
            controller  : 'TasksController'
        })
        .when('/project_name/members', {
            templateUrl : 'template/members.html',
            controller  : 'MembersController'
        })
        .when('/project_name/notes', {
            templateUrl : 'template/notes.html',
            controller  : 'NotesController'
        })

        // redirect if route not found
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});

// style
$(function() {

});

// resize
$(window).resize(function() {
    $(".content.right").css("width", $(window).width() - 320);
});