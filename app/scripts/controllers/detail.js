'use strict';

angular.module('rijksViewerApp')
  .controller('DetailCtrl', function ($scope, $routeParams) {
    $scope.work_id = $routeParams.id;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
