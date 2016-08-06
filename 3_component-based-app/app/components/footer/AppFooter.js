angular.module('demoApp')
.directive('appFooter', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/footer/app-footer.tpl.html',
    scope: {  },
  }
})
