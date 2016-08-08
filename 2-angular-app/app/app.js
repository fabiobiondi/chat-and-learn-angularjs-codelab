'use strict';

angular.module('demoApp', ['ngRoute'])
.value('URL', 'http://jsonplaceholder.typicode.com')


.controller('NavBarCtrl', function($location, $rootScope){
  $rootScope.$on('$routeChangeSuccess', function(scope, current, pre) {
    this.active = $location.path();
  }.bind(this))
})
