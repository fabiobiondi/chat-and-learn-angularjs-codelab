angular.module('demoApp')

.controller('HomePageCtrl', function($http, URL){
  this.title = 'Marketing stuff!';
  this.description = 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.';
  this.button = 'Get started today';
  this.buttonLink = '/news';

  $http.get(URL + '/posts')
      .then(function(result){
        this.news = result.data.splice(0,3);
      }.bind(this));
});
