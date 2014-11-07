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
        {link: "virtual_doctor", name: "Acitivity", active: false},
        {link: "virtual_doctor/tasks", name: "Tasks", active: false},
        {link: "virtual_doctor/notes", name: "Notes", active: false},
        {link: "virtual_doctor/edit", name: "Edit Project", active: false},
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
    $('#navigation').css("display","none");
    $('.l-content .menu').removeClass("animated slideOutLeft");
    $('.l-content .menu').addClass("animated slideInLeft");
    $('.r-content').removeClass("animated fadeOutRight");
    $('.r-content').addClass("animated fadeInRight");


    $scope.save = function() {
        $(".overlay-ajax").fadeIn(600, function() {
            $('#message').text("Successfully created new project");
            $(".overlay-ajax").fadeOut(600);
        });    
    };

    $('.menu ul li').click(function() {
        $('.pure-table table1').addClass("animated fadeOutRight");
        $('.pure-table table2').fadeIn("slow");
    });
});

// main page
app.controller("MainController", function($scope, $http) {
    $('#navigation').css("display","block");
    $('.l-content .menu').removeClass("animated slideOutLeft");
    $('.l-content .menu').addClass("animated slideInLeft");
    // $('.r-content').removeClass("animated fadeOutRight");
    // $('.r-content').addClass("animated fadeInRight");

    // $('.activity ul')

    console.log($('div.activity').offset().left);
    var activity_left =  $('div.activity').offset().left - 262;
    $('div.activity').css("width", $('.r-content.mainpage').width() - 6 - activity_left);
    $('div.duedate').css("margin-left", activity_left - $('div.duedate').width()/2);
    $('div.startdate').css("margin-left", activity_left - $('div.startdate').width()/2);
    // $('div.activity .event').css("width", $('div.activity').width() - 300);

    $('.activity ul').hover(function() {
        $(this).find('li.caret i ').toggleClass("hover");
        $(this).find('.event').toggleClass("hover");
    });

    $scope.add = function() {

        $('.movedown').animate({
            'margin-top':"+=20px"
        },300);
        $scope.member.push({name: $scope.newmember});
        // $scope.member[$scope.member.length -1].name;
    }

    $scope.member = allMember;

    angular.element($("#navigation")).scope().set_route(0);
});

// tasks page
app.controller("TasksController", function($scope, $http) {
    $('#navigation').css("display","block");
    $('.l-content .menu').removeClass("animated slideOutLeft");
    $('.l-content .menu').addClass("animated slideInLeft");
    // $('.r-content').removeClass("animated fadeOutRight");
    // $('.r-content').addClass("animated fadeInRight");


    $('.taskbar').on("click", function() {
        $(this).find('.subinfo').slideToggle("slow");
        return false;
    });

    $('.member li').draggable({
        start: function(e,ui) {
            $(this).addClass("object");
            $(this).find(".icon").css("display", "none");
        },
        stop: function(e,ui) {
            $(this).addClass("animated fadeOut");
            $(this).css("display", "none");
        }
    });

    $('.taskname').droppable({
        over: function(e,ui) {
            $(this).addClass("dropped");
        },
        out: function(e,ui) {
            $(this).removeClass("dropped");
        },
        drop: function(e,ui) {
            $(this).removeClass("dropped");
            $("#member").append(" - Janna Ashe");
        },
        tolerance: "pointer"
    });

    $scope.save = function() {
        $(".overlay-ajax").fadeIn(600, function() {
            $('#message').text("Successfully created new project");
            $(".overlay-ajax").fadeOut(600);
        });
    
    };

    $scope.members = allMember;

    angular.element($("#navigation")).scope().set_route(1);
});

// members page
app.controller("NotesController", function($scope, $http) {
    $('#navigation').css("display","block");
    $('.l-content .menu').removeClass("animated slideOutLeft");
    $('.l-content .menu').addClass("animated slideInLeft");
    // $('.r-content').removeClass("animated fadeOutRight");
    // $('.r-content').addClass("animated fadeInRight");

    $scope.note = allNotes[0];
    $scope.save = function() {
        $(".overlay-ajax").fadeIn(600, function() {
            $('#message').text("Successfully saved note");
            $(".overlay-ajax").fadeOut(600);
        });    
    };

    angular.element($("#navigation")).scope().set_route(2);
});

// notes page
app.controller("EditController", function($scope, $http) {
    $('#navigation').css("display","block"); 
    $('.l-content .menu').removeClass("animated slideOutLeft");
    $('.l-content .menu').addClass("animated slideInLeft");
    // $('.r-content').removeClass("animated fadeOutRight");
    // $('.r-content').addClass("animated fadeInRight");

    $scope.project = allProject[0];
    $scope.save = function() {
        $(".overlay-ajax").fadeIn(600, function() {
            $('#message').text("Successfully saved project");
            $(".overlay-ajax").fadeOut(600);
        });
    
    };

    angular.element($("#navigation")).scope().set_route(3);
});

// route setting
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'template/project_list.html',
            controller  : 'HomeController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");

                    $("#navigation").removeClass("animated fadeInRight");
                    $("#navigation").addClass("animated fadeOutRight");

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        // route for the main page
        .when('/virtual_doctor', {
            templateUrl : 'template/project.html',
            controller  : 'MainController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");

                    $("#navigation").removeClass("animated fadeOutRight");
                    $("#navigation").addClass("animated fadeInRight");

                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/virtual_doctor/tasks', {
            templateUrl : 'template/tasks.html',
            controller  : 'TasksController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");


                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/virtual_doctor/notes', {
            templateUrl : 'template/notes.html',
            controller  : 'NotesController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");


                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/virtual_doctor/create_note', {
            templateUrl : 'template/create_note.html',
            controller  : 'NotesController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");


                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/virtual_doctor/edit_note', {
            templateUrl : 'template/edit_note.html',
            controller  : 'NotesController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");


                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/virtual_doctor/edit', {
            templateUrl : 'template/edit_project.html',
            controller  : 'EditController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");


                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/create_new', {
            templateUrl : 'template/create_project.html',
            controller  : 'HomeController',
            resolve     : {
                fadeOut : function($q, $timeout) {
                    var delay = $q.defer();

                    $(".l-content .menu").removeClass("animated slideInLeft");
                    $(".l-content .menu").addClass("animated slideOutLeft");
                    $('.r-content').removeClass("animated fadeInRight");
                    $('.r-content').addClass("animated fadeOutRight");


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

// resize
$(window).resize(function() {
    $("div.r-container").css("height", $(window).height());
});

// database
var allProject = [
    {id: "1", code: "MHK01", name: "Virtual Doctor", description: "A virtual doctor service where people can evaluate their symptoms with guidance and get further instruction", duedate: "01.01.2015", status: "Active", leader: "Morgana Riot"},
    {id: "2", code: "MHK02", name: "marketing star", description: "The amount of videos on the Internet has grown exponentially ", duedate: "11.01.2015", status: "New", leader: "Riot Ryze"},
    {id: "3", code: "MHK03", name: "read my mind", description: "A new housing area, Etu-Lyötty, has been built in the vicinity of the library", duedate: "12.11.2014", status: "Finished", leader: "Lux Lucian"},
    {id: "4", code: "MHK04", name: "new city", description: "Define all customer segments using the Karjasilta library and create a new concept for the library", duedate: "01.01.2015", status: "Active", leader: "Tristana James"}
    ];

var allMember = [
    {name: "Ahri Riot"}, 
    {name: "Kassadin Joes"},
    {name: "Janna Ashe"}
];

var allNotes = [
    {title: "Basic template site", text: "Neque molestiae nobis ex sint incidunt animi. Ipsa eum repellat quisquam quasi dolorem sapiente porro repellat. Praesentium non enim quod corrupti maxime impedit illum. Minus ea quo labore et. Quas quia laudantium fuga est. Nihil exercitationem nam incidunt rerum animi repellat. Sit sapiente temporibus voluptate in. Rerum consequatur non sed delectus pariatur harum accusantium sint. Repellendus explicabo sapiente itaque ipsum. Saepe ipsum assumenda voluptatem aut. Ut rerum enim qui facere. Et quod ipsam id amet."},
    {title: "Document for using PHP Laravel framwork", text: "Neque molestiae nobis ex sint incidunt animi. Ipsa eum repellat quisquam quasi dolorem sapiente porro repellat. Praesentium non enim quod corrupti maxime impedit illum. Minus ea quo labore et. Quas quia laudantium fuga est. Nihil exercitationem nam incidunt rerum animi repellat. Sit sapiente temporibus voluptate in. Rerum consequatur non sed delectus pariatur harum accusantium sint. Repellendus explicabo sapiente itaque ipsum. Saepe ipsum assumenda voluptatem aut. Ut rerum enim qui facere. Et quod ipsam id amet."}
]
