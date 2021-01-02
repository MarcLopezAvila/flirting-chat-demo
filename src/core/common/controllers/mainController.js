App.controller('mainController', ['$rootScope','profilesFactory', function ($rootScope, profilesFactory) {

    //Enabled back button
    $rootScope.back = false;

    $rootScope.isMyFriend = profilesFactory.isMyFriend();
}]);
