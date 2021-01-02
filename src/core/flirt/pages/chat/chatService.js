App.service('chatService', ['$timeout', '$rootScope', '$sessionStorage','profilesFactory', function($timeout, $rootScope, $sessionStorage, profilesFactory) {

    var that = this;

    this.getMessages = function() {
        return $sessionStorage.messages;
    };

    this.sendMessage = function(message) {
        $sessionStorage.messages = $sessionStorage.messages ? $sessionStorage.messages : [];
        $sessionStorage.messages.push(message);
    };

    this.sendProfileResponse = function() {

        //Set time to emulate writing
        $timeout(function() {
            $rootScope.writing = true;
        }, 500);

        //Set time to emulate response
        $timeout(function() {
            that.sendMessage({
                from:'profile',
                msg:profilesFactory.getProfileResponse()
            });
            $rootScope.writing = false;

        }, 2000)
    }
}]);
