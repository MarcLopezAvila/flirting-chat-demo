var App = angular.module('App', ['ui.router', 'ngStorage'])

    //Constants
    .constant('userProfile', {
        image: './src/assets/img/user.jpeg',
    });
App.config(['$stateProvider', '$urlRouterProvider','$urlMatcherFactoryProvider', function ($stateProvider, $urlRouterProvider,$urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.strictMode(false);

    //Otherwise redirect to 404 page
    $urlRouterProvider.otherwise('/');
}]);

App.config(['$stateProvider', function ($stateProvider) {

    //Flirt Pages
    $stateProvider
        .state('flirt', {
            abstract: true,
            templateUrl: 'src/core/common/views/base.html'
        })

        /*Pages*/

        //Home
        .state('flirt.profile', {
            url: "/",
            templateUrl: 'src/core/flirt/pages/profile/views/profile-view.html',
            controller: 'profileController'
        })

        //Search results
        .state('flirt.chat', {
            url: '/chat',
            templateUrl: 'src/core/flirt/pages/chat/views/chat-view.html',
            controller: 'chatController'
        })
}]);
App.factory('profilesFactory', ['$sessionStorage', function($sessionStorage) {
    
    //Set array with all the fake profiles
    var profile =
        {
            image:'./src/assets/img/girl.jpg',
            name: 'Sophie',
            yearsOld: 20,
            city: 'Barcelona',
            greet: 'Hi!',
            description: 'My name is Sophie, I consider myself a perseverant person in what I propose until I achieve my goals. I like going out to spend a good time with friends and my family. I always try to see the positive side of things, and I\'m looking for a man who makes me laugh',
            greets: [
                'Hello!!! How are you? :)',
                'I want a real man, are you what I\'m looking for? ^^',
                'Hey! Would you like to meet this weekend? :P',
                'Hey, can we talk?',
                'Hi, Marc, what did you do yesterday? :)',
                'Mmmmm...',
                'Good morning! I\'m in my way to the gym, how are you? :D'
            ],

            responses: [
                'Oh! You are so funny!! ^^',
                'Thats right.. I\'m agree with you, i think we have a lot in common :P',
                'You are crazy!',
                'Ooh, man, I love the way you talk...'
            ]
        };

    //Return object getters and action function
    return {
        getProfileName: function() {
            return profile.name;
        },

        getAllProfile: function() {
            return profile;
        },

        getProfileStatus: function() {
            return true;
        },

        getProfileId: function() {
            return womanProfile;
        },

        isMyFriend: function() {
            return $sessionStorage.friend;
        },

        getProfileRandomMessage: function() {
            return profile.greets[Math.floor((Math.random() * 7))]
        },

        getProfileResponse: function() {
            return profile.responses[Math.floor((Math.random() * 4))]
        }
    }
}]);
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

App.service('profileService', ['$sessionStorage', function($sessionStorage) {

    this.addNewFriend = function() {
        $sessionStorage.friend = true;
    };

    this.removeFriend = function() {
        $sessionStorage.friend = false;
    };
}]);

App.controller('mainController', ['$rootScope','profilesFactory', function ($rootScope, profilesFactory) {

    //Enabled back button
    $rootScope.back = false;

    $rootScope.isMyFriend = profilesFactory.isMyFriend();
}]);

App.controller('topHeaderController', ['$state', '$scope', 'profilesFactory', function ($state, $scope, profilesFactory) {
    $scope.profileName = profilesFactory.getProfileName();
}]);

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

App.directive('topHeader', [function() {
    return {
        templateUrl: 'src/core/common/directives/top-header/views/top-header-view.html',
        controller : 'topHeaderController'
    };
}]);
//# sourceMappingURL=app.js.map