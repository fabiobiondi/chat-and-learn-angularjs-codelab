angular.module('demoApp')

.controller('NewsCtrl', function($http, URL){
  // get news
  $http.get(URL + '/posts')
      .then(function(result){
        this.news = result.data;
      }.bind(this));
})
