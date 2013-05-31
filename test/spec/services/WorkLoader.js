'use strict';

describe('Service: WorkLoader', function () {

  // load the service's module
  beforeEach(module('rijksViewerApp'));

  // instantiate service
  var WorkLoader;
  beforeEach(inject(function (_WorkLoader_) {
    WorkLoader = _WorkLoader_;
  }));

  it('should do something', function () {
    expect(!!WorkLoader).toBe(true);
  });

});
