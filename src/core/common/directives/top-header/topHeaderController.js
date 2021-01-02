App.controller('topHeaderController', ['$state', '$scope', 'profilesFactory', function ($state, $scope, profilesFactory) {
    $scope.profileName = profilesFactory.getProfileName();
}]);
