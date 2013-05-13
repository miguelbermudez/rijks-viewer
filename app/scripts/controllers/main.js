'use strict';

angular.module('djsreaderApp')
  .controller('MainCtrl', function ($scope, $http, $location, $routeParams) {
    $scope.works = [];
    $scope.busy = false;
    $scope.counter = 0;

    $scope.set_background = function (item) {
      var path = item.formats[0];
      var backgroundImage = 'background: url("' + path + '&200x200") no-repeat 0 0;';
      var backgroundSize = 'background-size: cover;';
      return backgroundImage + backgroundSize;
    }


    $scope.loadMore = function() {
      if ($scope.busy) return;
      $scope.busy = true;

      var _url = "http://127.0.0.1:9393/paintings/?callback=JSON_CALLBACK";
      if ($scope.counter == 0 && $routeParams.skip) {
        _url = "http://127.0.0.1:9393/paintings/?skip=" +$routeParams.skip + "&callback=JSON_CALLBACK";
        $scope.counter = parseInt($routeParams.skip);
        console.log('routeaparams: ', $routeParams);
      }

      $http.jsonp(_url,
        {
          cache: true,
          params: {skip: $scope.counter }
        }).
        success(function(data, status, headers, config) {
          var records = null;
          console.log("#",$scope.counter, data);

          records = data;
          angular.forEach(records, function(value) {
            $scope.works.push(value);
            $scope.counter += 1;
          });
          $location.search({skip:$scope.counter});
          $scope.busy = false;
        }).
        error(function(data, status, headers, config) {
          console.error('Error fetching feed:', data);
        });
    }

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
