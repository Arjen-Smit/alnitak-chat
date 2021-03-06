'use strict';

var chatApp = angular.module('chatApp', ['ngRoute', 'chatControllers', 'chatApp.config', 'angularMoment']);

// Loading the config into the rootscope to be used in the main html document
chatApp.run(function ($rootScope, config) {
	$rootScope.config = config;
});

chatApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/chat', {
                    templateUrl: '/assets/views/chat.html',
                    controller: 'chatCtrl'
            }).
            when('/login', {
                    templateUrl: '/assets/views/login.html',
                    controller: 'loginCtrl'
            }).
            when('/logout', {
                    templateUrl: '/assets/views/logout.html',
                    controller: 'logoutCtrl'
            }).
            otherwise({
                    redirectTo: '/login'
            });
    }]);

var chatControllers = angular.module('chatControllers', ['firebase', 'chatApp.config', 'luegg.directives', 'favico.service', 'windowEventBroadcasts']);
