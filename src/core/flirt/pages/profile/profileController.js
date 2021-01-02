App.controller('profileController', ['$scope', '$rootScope', 'profilesFactory','profileService', function ($scope,$rootScope, profilesFactory, profileService) {

    //Disable back arrow
    $rootScope.back = false;

    //Get current profile info
    $scope.profileInfo = profilesFactory.getAllProfile();
    $scope.profileStatus = profilesFactory.getProfileStatus() ? 'Online' : 'Offline';

    //Add as friend
    $scope.actionButton = function() {
        if($scope.isMyFriend) {
            profileService.removeFriend();
        } else {
            profileService.addNewFriend();
        }

        $rootScope.isMyFriend = !$rootScope.isMyFriend;
    };
}]);
