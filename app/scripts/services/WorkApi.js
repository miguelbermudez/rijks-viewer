'use strict';

angular.module('rijksViewerApp')
  .factory('Api', function ($http, $log) {
    // Service logic
    //----------------------------------------------------------------
    var PRODUCTION = false; //set to true to use deploy server
    //----------------------------------------------------------------

    var _mode = PRODUCTION === true ? "production" : "development";
    var meaningOfLife = 42;

    var getAPIUrl = function() {
      if (_mode === "production" ) {
        return 'http://dev.miguelbermudez.com:3000';
      } else {
        return 'http://localhost:3000';
      }
    };

    // Public API here
    // TODO: make all of this an  Angular Resource
    return {
      mode: _mode,
      url: getAPIUrl(),

      getPaintings: function(callback, skip) {
        skip || (skip = 0);

        var url = this.url + '/paintings/?skip=' + skip + '&callback=JSON_CALLBACK';
        $log.debug(url, skip);
        $http.jsonp(url, { cache:  true, params: {skip: skip } })
          .success(function(data) {
            var records, work_id, parser;
            $log.debug('#', skip, data);

            records = data;
            angular.forEach(records, function (value) {
              //get work_id from original image link
              //parse url trick: https://gist.github.com/jlong/2428561
              parser = document.createElement('a');
              parser.href = value.formats[0];
              work_id = parser.search.match(/=(.+)$/)[1];

              //add work_id key to work
              value.work_id = work_id;
            });
            callback(records);
          })
          .error(function (data, status) {
            console.error('Error fetching feed:', data, ' ', status);
          });
      },

      getPainting: function(callback, workId) {
        var url = this.url + '/painting/' + workId + '?callback=JSON_CALLBACK';
        $http.jsonp(url, { cache:  true })
          .success(function(data) {
            $log.debug('#', data);
            callback(data);
          })
          .error(function (data, status) {
            console.error('Error fetching work:', data, ' ', status);
          });
      },

      getImageUrl: function(workId, full) {
        var url;
        full || (full = false);

        url = this.url + '/image?id=' + workId;
        if (full) {
          return url + '&full=true'
        }
        return url;
      },

      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
