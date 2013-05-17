'use strict';

angular.module('rijksViewerApp')
  .controller('DetailCtrl', function ($scope, $routeParams, $location, $http) {
    $scope.work_id = $routeParams.id;
    $scope.work = {};
    $scope.detailFields = ['title', 'subject', 'description', 'identifier', 'date', 'creator', 'subject'];
    var workQuery = 'http://localhost:9393/painting/' + $scope.work_id + '?callback=JSON_CALLBACK';


    $scope.imageUrl = function (work_id, full) {
      var host, port, url;
      full || (full = false);
      host = 'localhost';
      port = 9393;
      url = $location.protocol() + '://' + host + ':' + port + '/image?id=' + work_id;
      if (full) {
        return url + '&full=true';
      }
      return url;
    };

    $scope.getBgImgObj = function (url) {
      console.log('gettinga bg image: ', url);
      var backgroundImage = 'background-image: url("' + url + '");';
      return backgroundImage;
    };

    $scope.cleanCreatorName = function(creatorStr) {
      var name;
      if (creatorStr){
        name = creatorStr.match(/\w+\:\s+(\w+.*)/)[1];
        return name.split(",").reverse().join(" ");
      }
    }

    $scope.fullImageUrl = $scope.imageUrl($scope.work_id, true);

    $http.jsonp(workQuery,
      {
        cache:  true
      }).
      success(function (data) {
        console.log('#', data);
        $scope.work = data[0];
      }).
      error(function (data, status) {
        console.error('Error fetching feed:', data, ' ', status);
      });

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
