var app = angular.module('app', ['ngRoute', 'ngSanitize'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('{{');
        $interpolateProvider.endSymbol('}}');
    });

app.controller("AppController", function($scope, $http) {

});

// navigation
app.controller("NavigationController", function($scope, $http) {
    $scope.navs = [
        {link: "home", name: "Home", active: false},
        {link: "projects", name: "Projects", active: false},
        {link: "application", name: "Apply", active: false},
        {link: "profile", name: "Profile", active: false},
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
    $('.carousel').carousel();

    $('html, body').animate({
            scrollTop: 0
        }, 300);
    angular.element($("#navigation")).scope().set_route(0);
});

// Application page
app.controller("ApplicationController", function($scope, $http) {

    $('html, body').animate({
            scrollTop: 0
        }, 300);
    angular.element($("#navigation")).scope().set_route(2);
});

// Project list page
app.controller("ProjectListController", function($scope, $http) {

    $(".thumbnail").hover(function() {
        $(this).find(".project-button").removeClass("fadeOutUp");
        $(this).find(".overlay").removeClass("fadeIn");
        $(this).find(".project-button").addClass("animated fadeInUp");
        $(this).find(".project-button").css("display", "block");
        $(this).find(".overlay").addClass("animated fadeIn");
        $(this).find(".overlay").css("background", "rgba(1,1,1,0.4)");
    }, function() {
        $(this).find(".project-button").addClass("fadeOutUp");
        $(this).find(".overlay").css("background", "rgba(1,1,1,0.1)");
    });

    $('html, body').animate({
            scrollTop: 0
        }, 300);

    angular.element($("#navigation")).scope().set_route(1);
});

// Project details page
app.controller("ProjectController", function($scope, $http) {
    $scope.img_src = "img/blank-img.png";

    $(".gallery img").click(function(){
        var source = $(this).attr('src')
        $scope.$apply(function() {
            $scope.img_src = source;
        });
        console.log($("#select-img").attr('src'));
        $("#full-img").modal('show');
    });

    $scope.opentask = function(element) {
        var element = '.' + element;
        $(element).find('.bs-callout').removeClass("bs-callout-default");
        $(element).find('.bs-callout').removeClass("bs-callout-danger");
        $(element).find('.bs-callout').addClass("bs-callout-primary");
        console.log($(element).find('.bs-callout').attr("class"));
    }

    $scope.closetask = function(element) {
        var element = '.' + element;
        $(element).find('.bs-callout').removeClass("bs-callout-default");
        $(element).find('.bs-callout').removeClass("bs-callout-primary");
        $(element).find('.bs-callout').addClass("bs-callout-danger");
    }

    $('#myStat').circliful();

    $('html, body').animate({
            scrollTop: 0
        }, 300);
});

// Projfile details page
app.controller("ProfileController", function($scope, $http) {

    $('html, body').animate({
            scrollTop: 0
        }, 300);
    angular.element($("#navigation")).scope().set_route(3);
});



// route setting
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'template/home.html',
            controller  : 'HomeController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/application', {
            templateUrl : 'template/application.html',
            controller  : 'ApplicationController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/projects', {
            templateUrl : 'template/projects.html',
            controller  : 'ProjectListController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/projects/2013', {
            templateUrl : 'template/2013.html',
            controller  : 'ProjectListController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/project', {
            templateUrl : 'template/project.html',
            controller  : 'ProjectController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/profile', {
            templateUrl : 'template/profile.html',
            controller  : 'ProfileController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
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


