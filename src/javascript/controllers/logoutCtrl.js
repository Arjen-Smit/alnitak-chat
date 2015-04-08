'use strict';

chatControllers.controller('logoutCtrl', function($scope, $firebaseAuth, $location) {
	var ref = new Firebase("https://alnitak-chat.firebaseio.com/");
	ref.unauth();
});