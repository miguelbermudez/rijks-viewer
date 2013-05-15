'use strict';

angular.module('rijksViewerApp')
  .directive('mbWorkTile', function () {
    return {
      //template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var idCard, parentUl;
        idCard = angular.element(element.children()[1]);
        parentUl = angular.element(element.parent());
        element.bind('mouseover', function() {
          parentUl.children().addClass('deactive');
          idCard.parent().addClass('active').toggleClass('deactive');
          idCard.addClass('over');
        });
        element.bind('mouseout', function() {
          parentUl.children().removeClass('deactive');
          idCard.parent().removeClass('active');
          idCard.removeClass('over');
        });
      }
    };
  });
