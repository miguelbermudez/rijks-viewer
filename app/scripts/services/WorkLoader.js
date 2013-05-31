'use strict';

angular.module('rijksViewerApp')
  .factory('WorkLoader', function (Api, $route, $q) {
    // Service logic
    // ...


    // Public API here
    return function() {
      var delay = $q.defer();

      Api.getPainting(function(data) {
        delay.resolve(data);
      }, $route.current.params.id);
      return delay.promise;
    };
  });
