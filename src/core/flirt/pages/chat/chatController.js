App.controller('chatController', ['$timeout', '$scope','$rootScope','chatService','profilesFactory','userProfile', function ($timeout, $scope, $rootScope, chatService, profilesFactory, userProfile) {

    //Enable back arrow
    $rootScope.back = true;

    //Send message from profile when users enter
    chatService.sendMessage({
        from: 'profile',
        msg: profilesFactory.getProfileRandomMessage()
    });

    //Get current profile
    $scope.userInfo = userProfile;
    $scope.profileInfo = profilesFactory.getAllProfile();

    //Getting current messages
    $scope.messages = chatService.getMessages();

    //Set message to undefined
    $scope.theMessage = '';

    //Submit
    $scope.newMessage = function(chatForm) {

        if(chatForm.$valid && chatForm.$dirty) {

            chatService.sendMessage({
                from: 'user',
                msg: $scope.theMessage
            });

            //Update state
            $scope.theMessage = '';
            $scope.messages = chatService.getMessages();

            //Send response
            chatService.sendProfileResponse();
        }
    };

    $scope.scrollBottom = function() {
        $timeout(function() {
            var mainEl = document.querySelector("main");

            mainEl.scrollTop = mainEl.scrollHeight;

            document.body.scrollTop = mainEl.scrollHeight;
            document.documentElement.scrollTop = mainEl.scrollHeight;

        }, 0);
    };


    //Set scroll to bottom when messages changes
    $scope.$watch('messages', function() {
        $scope.scrollBottom();
    }, true);

    $scope.$watch('writing', function() {
        $scope.scrollBottom();
    }, true);
}]);
