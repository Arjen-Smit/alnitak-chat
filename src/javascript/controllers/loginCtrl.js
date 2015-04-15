'use strict';

chatControllers.controller('loginCtrl', ['$scope', 'config', '$firebaseAuth', '$firebaseObject', '$location', function($scope, config, $firebaseAuth, $firebaseObject, $location) {
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

        var profile = new Firebase(config.api + "users/" + authData.google.id);
        var syncObject = $firebaseObject(profile);
        syncObject.$bindTo($scope, "profile");

        var userProfile = authData.google.cachedUserProfile;

        profile.set({
            name: userProfile.name,
            picture: userProfile.picture
        });

		$location.path('/chat');

  	}).catch(function(error) {});
}]);
