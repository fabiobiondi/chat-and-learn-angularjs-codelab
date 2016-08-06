angular.module('demoApp')
.directive('jumbotron', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/jumbotron/jumbotron.tpl.html',
    scope: {
      title: '@',
      description: '@',
      button: '@',
      link: '@'
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    }
  }
})
