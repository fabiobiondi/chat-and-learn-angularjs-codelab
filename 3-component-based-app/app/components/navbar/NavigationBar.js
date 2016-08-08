angular.module('demoApp')
.directive('navigationBar', function($rootScope, $location) {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/navbar/navigation.tpl.html',
    scope: {},
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function($scope) {
      $rootScope.$on('$routeChangeSuccess', function(scope, current, pre) {
        this.active = $location.path();
      }.bind(this))
    }
  }
})
