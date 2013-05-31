'use strict';

angular.module('rijksViewerApp')
  .controller('DetailCtrl', function ($scope, $routeParams, $location, $http, $log, Api, work) {

    $scope.work = work[0];
    $scope.detailFields = ['title', 'subject', 'description', 'identifier', 'date', 'creator', 'subject'];

    //setup colors
    var colorKeys =  Object.keys(chroma.colors);
    var randomColorName = colorKeys[Math.floor(Math.random()*colorKeys.length)];
    $scope.randomColor = new chroma.Color(randomColorName);

    $scope.fullImageUrl = Api.getImageUrl($scope.work['work_id'], true);

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
