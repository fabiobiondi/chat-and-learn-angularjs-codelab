angular.module('demoApp')

.controller('NewsDetailCtrl', function( $routeParams,
                                        $http,
                                        NewsService) {

  // Get news details
  NewsService.getPost($routeParams.id)
      .then(function(result){
        this.news = result.data;
      }.bind(this));
});
