'use strict';

chatControllers.controller('chatCtrl', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'favicoService', function($scope, $firebaseAuth, $firebaseArray, $location, favicoService) {
	var ref = new Firebase("https://alnitak-chat.firebaseio.com/");
 	var authData = ref.getAuth();
 	if (!authData) {
 		$location.path('/login');
 	}

 	$scope.user = authData.google.cachedUserProfile;

 	var messages = new Firebase("https://alnitak-chat.firebaseio.com/messages");
	$scope.messages = $firebaseArray(messages);

	var awayFor = 0;
	var away = false;

	$scope.$on('$windowFocus', function(broadcastEvent, browserEvent) {
		awayFor = 0;
		favicoService.badge(awayFor);
		away = false;
  	});

  	$scope.$on('$windowBlur', function(broadcastEvent, browserEvent) {
		awayFor = 0;
		away= true;
  	});
  	
	messages.on("value", function(snapshot) {
		awayFor++;
	  	if (awayFor !== 0 && away) {
	  		favicoService.badge(awayFor);	  
	  	}
	});

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
}]);