'use strict';

angular.module('rijksViewerApp')
  .controller('MainCtrl', function ($scope, $http, $location, $routeParams, $log, Api) {
    $scope.works = [];


    $scope.loadMore = function () {
      $log.debug('routeaparams: ', $routeParams);
      Api.getPaintings(function(data) {
        $scope.works = data;
      }, $routeParams.skip);
    };


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
