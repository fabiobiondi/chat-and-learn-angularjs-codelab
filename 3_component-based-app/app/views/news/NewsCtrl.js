angular.module('demoApp')

.controller('NewsCtrl', function(NewsService){
  // get news
  NewsService.getPosts()
      .then(function(result){
        this.news = result.data;
      }.bind(this));
})
