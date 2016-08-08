angular.module('demoApp')
.directive('postList', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/post-list/post-list.tpl.html',
    scope: {
      items: '=',
      search: '='
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    }
  }
})
