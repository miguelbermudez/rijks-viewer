'use strict';

angular.module('rijksViewerApp')
  .controller('MainCtrl', function ($scope, $http, $location, $routeParams, $log, Api) {
    $scope.works = [];

    $scope.set_background = function (item) {
      var backgroundImage, backgroundSize, backgroundPosition;

      backgroundImage = 'background: url("' + Api.getImageUrl(item.work_id) + '") no-repeat 0 0;';
      backgroundSize = 'background-size: cover;';
      backgroundPosition = 'background-position: 50%';
      return backgroundImage + backgroundSize + backgroundPosition;
    };


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
