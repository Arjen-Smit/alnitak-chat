'use strict';

chatControllers.controller('loginCtrl', function($scope, $firebaseAuth, $location) {
	var authRef = new Firebase("https://alnitak-chat.firebaseio.com/");
	var auth = $firebaseAuth(authRef);
	auth.$authWithOAuthPopup("google").then(function(authData) {
		$location.path('/chat');
  	}).catch(function(error) {});
});