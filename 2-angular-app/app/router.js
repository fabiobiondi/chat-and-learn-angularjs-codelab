angular.module('demoApp')

.config(function($routeProvider) {

  $routeProvider
    .when('/homepage',
      {
        templateUrl: 'app/views/homepage/homepage.tpl.html',
        controller: 'HomePageCtrl',
        controllerAs: 'ctrl'
      })

    .when('/news',
      {
        templateUrl: 'app/views/news/news.tpl.html',
        controller: 'NewsCtrl',
        controllerAs: 'ctrl'
      })

    .when('/news/:id',
      {
        templateUrl: 'app/views/news/news.details.tpl.html',
        controller: 'NewsDetailCtrl',
        controllerAs: 'ctrl'
      })

    .when('/reports',
        {
          templateUrl: 'app/views/reports/reports.tpl.html',
          controller: 'ReportCtrl',
          controllerAs: 'ctrl'
        })

    .when('/contacts',
      {
        templateUrl: 'app/views/contacts/contacts.tpl.html',
        controller: 'ContactPageCtrl',
        controllerAs: 'ctrl'
      })

    .otherwise({redirectTo: 'homepage'});
});
