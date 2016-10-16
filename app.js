var app = angular.module("formapp",['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'MainController'
  })
  .otherwise({
    controller: '',
    templateUrl: '404.html'
  });
});