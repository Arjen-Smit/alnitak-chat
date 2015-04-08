'use strict';

chatControllers.controller('chatCtrl', function($scope, $firebaseAuth, $firebaseArray, $location) {
	var ref = new Firebase("https://alnitak-chat.firebaseio.com/");
 	var authData = ref.getAuth();
 	if (!authData) {
 		$location.path('/login');
 	}

 	$scope.user = authData.google.cachedUserProfile;

 	var messages = new Firebase("https://alnitak-chat.firebaseio.com/messages");
	$scope.messages = $firebaseArray(messages);

  	$scope.sendMessage = function() {
  		if ($scope.text) {
	  		$scope.messages.$add({
  				'name': $scope.user.name, 
  				'message': $scope.text,
  				'picture': $scope.user.picture,
  				'timestamp': new Date().getTime()
	  		});
	  		$scope.text = '';
  		}
  	};
});