angular.module('demoApp')

.directive('chart', function() {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div style="width: 100%; height: 300px"></div>',
    scope: {
      config: '=',
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($scope, $element) {
       var chart = $($element[0]);
       // console.log ($element[0])

       // watch for config changes
       $scope.$watchCollection(
         function() {
           return this.config;
         }.bind(this),
         function(val) {
           chart.highcharts(val);
         }
       )
    }
  }
})
