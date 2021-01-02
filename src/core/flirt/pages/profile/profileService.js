App.service('profileService', ['$sessionStorage', function($sessionStorage) {

    this.addNewFriend = function() {
        $sessionStorage.friend = true;
    };

    this.removeFriend = function() {
        $sessionStorage.friend = false;
    };
}]);
