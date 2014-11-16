(function colorPusherPanel(angular) {
  var panel = angular.module('color-pusher-panel', ['color-pusher-widget']);

  panel.controller('color-pusher-ctrl', ['$scope', colorPusherCtrl]);

  function colorPusherCtrl($scope) {
    console.log('colorPusherCtrl');

    $scope.$on('apply-colors', function onApplyColor(event, colors) {
      check.verify.object(colors, 'expected colors to be an object ' +
        JSON.stringify(colors, null, 2));

      window.respond('apply-colors', colors);

      ga('send', 'event', 'button', 'click', 'apply-colors', 1);
    });
  }
}(angular));
