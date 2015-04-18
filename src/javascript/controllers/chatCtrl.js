'use strict';

chatControllers.controller('chatCtrl', ['$scope', 'config', '$firebaseAuth', '$firebaseArray', '$firebaseObject', '$location', 'favicoService', function($scope, config, $firebaseAuth, $firebaseArray, $firebaseObject, $location, favicoService) {
	var ref = new Firebase(config.api);
 	var authData = ref.getAuth();
 	if (!authData) {
 		$location.path('/login');
 	} else {
        $scope.user = authData.google.cachedUserProfile;

        var messages = new Firebase(config.api + "messages");
        $scope.messages = $firebaseArray(messages);

        var profile = new Firebase(config.api + "users/" + authData.google.id);
        var syncObject = $firebaseObject(profile);
        syncObject.$bindTo($scope, "profile");

        var attendees = new Firebase(config.api + "users");
        $scope.attendees = $firebaseArray(attendees);

        var presence = new Firebase(config.api + "presence");
        $scope.presence = $firebaseArray(presence);

        var amOnline = new Firebase(config.api + '.info/connected');
        var userRef = new Firebase(config.api + 'users/' + authData.google.id + "/status");
        amOnline.on('value', function(snapshot) {
            if (snapshot.val()) {
                userRef.onDisconnect().set("offline");
                userRef.set("online");
            }
        });

        var awayFor = 0;
        var away = false;

        $scope.$on('$windowFocus', function(broadcastEvent, browserEvent) {
            awayFor = 0;
            favicoService.reset();
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
                    id: $scope.user.id,
                    name: $scope.user.name,
                    message: $scope.text,
                    picture: $scope.user.picture,
                    timestamp: new Date().getTime()
                });
                $scope.text = '';
            }
        };

    }
}]);