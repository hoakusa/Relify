var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngAnimate'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');
    });

app.controller("GlobalController", function($scope, $http) {
    // $("div.r-container").css("height", $(window).height() - 52);
});

// header
app.controller("HeaderController", function($scope, $http) {
    $('.navbar').addClass("animated fadeInDown");
});

// navigation 
app.controller("NavigationController", function($scope, $http) {
    $scope.navs = [
        {link: "project_name", name: "Acitivity", active: false},
        {link: "project_name/tasks", name: "Tasks", active: false},
        {link: "project_name/notes", name: "Notes", active: false},
        {link: "project_name/edit", name: "Edit Project", active: false},
    ];

    $scope.set_route = function(id) {
        for (index = 0; index < $scope.navs.length; ++index) {
            $scope.navs[index].active = false;
        }
        $scope.navs[id].active = true;

        $scope.nav = $scope.navs[id];
    };
});

// home page
app.controller("HomeController", function($scope, $http) {
    $scope.projects = allProject;
    $('.l-sidebar').addClass("animated fadeInLeft");
    $('#navigation').css("display","none");
    $scope.save = function() {
        $('#message').text("Successfully created new project");
    };
});

// main page
app.controller("MainController", function($scope, $http) {
    $('#navigation').css("display","block");

    console.log($('div.activity').offset().left);
    var activity_left =  $('div.activity').offset().left - 262;
    $('div.activity').css("width", $('.r-content.mainpage').width() - 6 - activity_left);
    $('div.duedate').css("margin-left", activity_left - $('div.duedate').width()/2);
    $('div.startdate').css("margin-left", activity_left - $('div.startdate').width()/2);
    // $('div.activity .event').css("width", $('div.activity').width() - 100);

    $('.activity ul').hover(function() {
        $(this).find('li.caret i ').toggleClass("hover");
        $(this).find('.event').toggleClass("hover");
    });

    angular.element($("#navigation")).scope().set_route(0);
});

// tasks page
app.controller("TasksController", function($scope, $http) {
    $('#navigation').css("display","block");
    $('.taskbar').on("click", function() {
        $(this).find('.subinfo').slideToggle("slow");
        return false;
    });

    angular.element($("#navigation")).scope().set_route(1);
});

// members page
app.controller("NotesController", function($scope, $http) {
    $('#navigation').css("display","block");
    angular.element($("#navigation")).scope().set_route(2);
});

// notes page
app.controller("EditController", function($scope, $http) {
    $('#navigation').css("display","block"); 

    $scope.save = function() {
        $('#message').text("Successfully edited information");
    };

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
        .when('/project_name/notes', {
            templateUrl : 'template/notes.html',
            controller  : 'NotesController'
        })
        .when('/project_name/edit', {
            templateUrl : 'template/edit_project.html',
            controller  : 'EditController'
        })
        .when('/create_new', {
            templateUrl : 'template/create_project.html',
            controller  : 'HomeController'
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
    $("div.r-container").css("height", $(window).height());
});

// database
var allProject = [
    {id: "1", code: "MHK01", name: "Project 1", description: "A short description about project", duedate: "01.01.2015", status: "Active", leader: "Mr.A"},
    {id: "2", code: "MHK02", name: "Project 2", description: "A short description about project", duedate: "01.01.2015", status: "New", leader: "Mr.B"},
    {id: "3", code: "MHK03", name: "Project 3", description: "A short description about project", duedate: "01.01.2015", status: "Finished", leader: "Mr.A"},
    {id: "4", code: "MHK04", name: "Project 4", description: "A short description about project", duedate: "01.01.2015", status: "Active", leader: "Mr.B"}
    ];