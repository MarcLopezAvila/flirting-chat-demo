App.config(['$stateProvider', '$urlRouterProvider','$urlMatcherFactoryProvider', function ($stateProvider, $urlRouterProvider,$urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.strictMode(false);

    //Otherwise redirect to 404 page
    $urlRouterProvider.otherwise('/');
}]);
