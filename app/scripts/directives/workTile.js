'use strict';

angular.module('rijksViewerApp')
  .directive('mbWorktile', function () {
    return {
      template: '<li><a href="/#/detail/{{workitem.work_id | lowercase}}"'
                  + 'style="{{set_background(workitem)}}" '
                  + 'title="{{workitem.title}} by {{workitem.creator}}" '
                  + 'class="works_tile" '
                  + 'data-identifier="{{workitem.identifier}}">'
                  +'</a>'
                  + '<div class="id-card">'
                  + '<h2>{{workitem.title | truncate:60}}</h2>'
                  + '<p>{{workitem.creator}}</p><p class="date">{{workitem.date}}</p>'
                  + '</div></li>',
      restrict: 'AE',
      replace: true,
      scope: {
        workitem: '='
      },
      link: function postLink(scope, element) {
        var idCard, parentUl, anchorImage;
        idCard = angular.element(element.children()[1]);
        parentUl = angular.element(element.parent());
        anchorImage = angular.element(element.find('a'));
        console.log(anchorImage.css('background'));
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
      },
      controller: function($scope, $element, $attrs, $location, Api) {
        $scope.set_background = function (item) {
          var backgroundImage, backgroundSize, backgroundPosition;

          backgroundImage = 'background: url("' + Api.getImageUrl(item.work_id) + '") no-repeat 0 0;';
          backgroundSize = 'background-size: cover;';
          backgroundPosition = 'background-position: 50%';
          return backgroundImage + backgroundSize + backgroundPosition;
        };
      }
    };
  });
