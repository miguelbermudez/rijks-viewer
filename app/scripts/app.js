'use strict';

angular.module('rijksViewerApp', [])
  .config(function ($locationProvider, $routeProvider, $logProvider) {
    //$locationProvider.html5Mode(true);
    $logProvider.debugEnabled(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
        //reloadOnSearch: false
      })
      .when('/detail/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl',
        resolve: {
           work: function(WorkLoader) {
             return WorkLoader();
           }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

  });
