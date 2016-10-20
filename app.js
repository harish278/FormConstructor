var app = angular.module("formapp",['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'MainController'
  })
  .when('/newform', {
    templateUrl: 'views/newform.html',
    controller: 'FormController'
  })
  .when('/survey/:id', {
    templateUrl: 'views/survey.html',
    controller: 'SurveyController'
  })
  .otherwise({
    templateUrl: '404.html'
  });
});