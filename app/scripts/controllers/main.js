'use strict';

angular.module('rijksViewerApp')
  .controller('MainCtrl', function ($scope, $http, $location, $routeParams) {
    //var apiUrl = 'http://dev.miguelbermudez.com:9292';
    var apiUrl = 'http://dev.miguelbermudez.com:3000';
    $scope.works = [];
    $scope.busy = false;
    $scope.counter = 0;

    $scope.set_background = function (item) {
      var path = item.work_id;
      //var backgroundImage = 'background: url("' + path + '&200x200") no-repeat 0 0;';
      var backgroundImage = 'background: url("' + $scope.resizeImageUrl(path) + '") no-repeat 0 0;';
      var backgroundSize = 'background-size: cover;';
      var backgroundPosition = 'background-position: 50%';
      return backgroundImage + backgroundSize + backgroundPosition;
    };


    $scope.loadMore = function () {
      if ($scope.busy) {return;}
      $scope.busy = true;

      var _url = apiUrl + '/paintings/?callback=JSON_CALLBACK';
      if ($scope.counter === 0 && $routeParams.skip) {
        _url = apiUrl + '/paintings/?skip=' + $routeParams.skip + '&callback=JSON_CALLBACK';
        $scope.counter = parseInt($routeParams.skip, 10);
        console.log('routeaparams: ', $routeParams);
      }

      $http.jsonp(_url,
        {
          cache:  true,
          params: {skip: $scope.counter }
        }).
        success(function (data) {
          var records = null, work_id, parser;
          console.log('#', $scope.counter, data);

          records = data;
          angular.forEach(records, function (value) {
            //get work_id from original image link
            //parse url trick: https://gist.github.com/jlong/2428561
            parser = document.createElement('a');
            parser.href = value.formats[0];
            work_id = parser.search.match(/=(.+)$/)[1];

            //add work_id key to work
            value.work_id = work_id;

            $scope.works.push(value);
            //$scope.counter += 1;
          });
          $location.search({skip: $scope.counter});
          $scope.busy = false;
        }).
        error(function (data, status) {
          console.error('Error fetching feed:', data, ' ', status);
        });
    };

    $scope.resizeImageUrl = function (work_id) {
      var host, port;
      host = 'localhost';
      port = 9393;
      //console.log("imageURL: ", $location.protocol() + "://" + host + ":" + port + "/image?id=" + work_id);
      //return $location.protocol() + '://' + host + ':' + port + '/image?id=' + work_id;
      return apiUrl + '/image?id=' + work_id;
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
