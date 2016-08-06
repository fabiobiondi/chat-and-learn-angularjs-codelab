angular.module('demoApp')

.controller('NewsDetailCtrl', function($routeParams, $http, URL){
  // Get user ID from URL
  var id = $routeParams.id;
  // Get news details
  $http.get(URL + '/posts/' + id)
      .then(function(result){
        this.news = result.data;
      }.bind(this));
});
