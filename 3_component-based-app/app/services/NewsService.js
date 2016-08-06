angular.module('demoApp')
.value('URL', 'http://jsonplaceholder.typicode.com')

.service('NewsService', function($http, URL) {

  this.getIntro = function() {
    return {
      title: 'Marketing stuff!',
      description: 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.',
      button: 'Get started today',
      buttonLink: '/news'
    };
  }
  this.getPosts = function() {
    return $http.get(URL + '/posts/');
  }

  this.getPost = function(id) {
    return $http.get(URL + '/posts/' + id);
  }

});
