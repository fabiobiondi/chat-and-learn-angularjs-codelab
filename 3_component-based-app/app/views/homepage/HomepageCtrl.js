angular.module('demoApp')

.controller('HomePageCtrl', function(NewsService) {

  this.introObj = NewsService.getIntro();

  NewsService.getPosts()
      .then(function(result){
        this.news = result.data.slice(0, 3);
      }.bind(this));
});
