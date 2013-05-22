'use strict';

describe('Controller: DetailCtrl', function () {

  // load the controller's module
  beforeEach(module('rijksViewerApp'));

  var DetailCtrl,
    api,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _api_) {
    scope = $rootScope.$new();
    api = _api_;
    DetailCtrl = $controller('DetailCtrl', {
      $scope: scope,
      Api: api
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
