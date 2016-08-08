angular.module('demoApp')

.controller('ReportCtrl', function(ReportService) {
  this.tableData = ReportService.getChartData();
  this.chartData = angular.copy(this.tableData);

  // Update data
  this.updateChart = function(index, row) {
    this.activeIndex = index;
    // Merge original data and override series with the selected one
    this.chartData = angular.extend({},
      // Deep clone of original data model
      angular.merge(this.tableData),
      // Override previous series with the selected one
      {series: [row]}
    );
  }

  // View all series (original data model)
  this.viewAll = function() {
    // remove select row
    this.activeIndex = null;
    // restore original data
    this.chartData = angular.copy(this.tableData);
  }

})
