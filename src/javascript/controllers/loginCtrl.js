'use strict';

chatControllers.controller('loginCtrl', ['$scope', 'config', '$firebaseAuth', '$location', function($scope, config, $firebaseAuth, $location) {
	var authRef = new Firebase(config.api);
	var auth = $firebaseAuth(authRef);
	auth.$authWithOAuthPopup("google", {scope: "email"}).then(function(authData) {
        if (typeof config.restrictedHd !== 'undefined' ) {
            if (config.restrictedHd !== authData.google.cachedUserProfile.hd) {
                authRef.unauth();
                $location.path('/login');
                return false;
            }
        }

		$location.path('/chat');

  	}).catch(function(error) {});
}]);
