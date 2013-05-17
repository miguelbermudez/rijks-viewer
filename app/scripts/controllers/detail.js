'use strict';

angular.module('rijksViewerApp')
  .controller('DetailCtrl', function ($scope, $routeParams, $location, $http) {
    $scope.work_id = $routeParams.id;
    $scope.work = {};
    $scope.detailFields = ['title', 'subject', 'description', 'identifier', 'date', 'creator', 'subject'];
    var workQuery = 'http://localhost:9393/painting/' + $scope.work_id + '?callback=JSON_CALLBACK';

    var colorKeys =  Object.keys(chroma.colors);
    var randomColorName = colorKeys[Math.floor(Math.random()*colorKeys.length)];
    $scope.randomColor = new chroma.Color(randomColorName);


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

    $scope.termToggle = function() {
      console.log('term: ',this.term);
      this.term = !this.term;
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


    $scope.colorPicker = function(factor) {
      factor || (factor = 1);
      var base = 5; //default for Chroma.js
      var amount = base*factor;
      //console.log('random color: ', randomColorName, ' ', amount, $scope.randomColor.brighten(amount).hex());
      return { 'background-color': $scope.randomColor.darken(40).brighten(amount).hex() };
    }


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
