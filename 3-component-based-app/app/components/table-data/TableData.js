angular.module('demoApp')
.directive('tableData', function() {
  return {
    restrict: 'EA',
    templateUrl: 'app/components/table-data/table-data.tpl.html',
    scope: {
      data: '=',
      onSelectRow: '&',
      activeIndex: '=',
    },
    controllerAs: 'ctrl',
    bindToController: true,
    controller: function() {

    }
  }
})
