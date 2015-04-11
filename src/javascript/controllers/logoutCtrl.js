'use strict';

chatControllers.controller('loginCtrl', ['$scope', 'config', '$firebaseAuth', '$location', function($scope, config, $firebaseAuth, $location) {
	var ref = new Firebase(config.api);
	ref.unauth();
}]);