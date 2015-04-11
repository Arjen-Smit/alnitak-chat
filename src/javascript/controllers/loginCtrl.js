'use strict';

chatControllers.controller('loginCtrl', ['$scope', 'config', '$firebaseAuth', '$location', function($scope, config, $firebaseAuth, $location) {
	var authRef = new Firebase(config.api);
	var auth = $firebaseAuth(authRef);
	auth.$authWithOAuthPopup("google").then(function(authData) {
		$location.path('/chat');
  	}).catch(function(error) {});
}]);