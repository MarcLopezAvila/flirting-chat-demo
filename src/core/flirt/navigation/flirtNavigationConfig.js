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