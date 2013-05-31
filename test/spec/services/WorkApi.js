'use strict';

describe('Service: api', function () {

  // load the service's module
  beforeEach(module('rijksViewerApp'));

  // instantiate service
  var api;
  beforeEach(inject(function (_api_) {
    api = _api_;
  }));

  it('should do something', function () {
    expect(!!api).toBe(true);
  });

//  it ('should use correct url for production mode', function() {
//    api.mode = "production";
//    expect(api.url).toBe("http://dev.miguelbermudez.com:3000");
//  });

});
