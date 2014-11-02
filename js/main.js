var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngAnimate'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

app.controller("GlobalController", function($scope, $http) {
    
});

// header
app.controller("HeaderController", function($scope, $http) {
    $('.navbar').addClass("animated fadeInDown");
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
        console.log(id);
        for (var i = 0; i < $scope.tabs.length(); i++) {
            $scope.tabs[i].active = false;
        }
        $scope.tabs[id].active = true;
        $scope.tab = $scope.tabs[id];
    };
});

// home page
app.controller("HomeController", function($scope, $http) {
    $scope.projects = [
    {id: "1", code: "MHK01", name: "Project 1", description: "A soft description about project", duedate: "01.01.2015", status: "Active", leader: "Mr.A"},
    {id: "2", code: "MHK02", name: "Project 2", description: "A soft description about project", duedate: "01.01.2015", status: "New", leader: "Mr.B"},
    {id: "3", code: "MHK03", name: "Project 3", description: "A soft description about project", duedate: "01.01.2015", status: "Finished", leader: "Mr.A"},
    {id: "4", code: "MHK04", name: "Project 4", description: "A soft description about project", duedate: "01.01.2015", status: "Active", leader: "Mr.B"}
    ];
    $('.l-sidebar').addClass("animated fadeInLeft");
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