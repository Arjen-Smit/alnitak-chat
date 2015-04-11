'use strict';
var chatApp = angular.module('chatApp', ['ngRoute', 'chatControllers']);

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

var chatControllers = angular.module('chatControllers', ['firebase', 'luegg.directives', 'favico.service', 'windowEventBroadcasts', 'yaru22.angular-timeago', 'chatApp.config']);
