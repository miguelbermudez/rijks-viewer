'use strict';

angular.module('rijksViewerApp', ['infinite-scroll'])
  .config(function ($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
        //reloadOnSearch: false
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
