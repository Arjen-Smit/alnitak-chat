'use strict';

chatControllers.controller('logoutCtrl', ['$scope', 'config', '$firebaseAuth', '$location', function($scope, config, $firebaseAuth, $location) {
	var ref = new Firebase(config.api);
	ref.unauth();
}]);