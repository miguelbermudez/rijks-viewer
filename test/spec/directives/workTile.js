'use strict';

describe('Directive: workTile', function () {
  beforeEach(module('rijksViewerApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<art-tile></art-tile>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the artTile directive');
  }));
});
