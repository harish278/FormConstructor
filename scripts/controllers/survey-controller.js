'use strict';
angular.module('formapp').controller("SurveyController", ['$scope', '$routeParams', '$http', '$location', 'FormService', function ($scope, $routeParams, $http, $location, FormService) {
	$scope.surveyData = null;
	var URL = "http://52.74.76.164:8001/api/v1/survey?surveyFormId=" + $routeParams.id;
	$http.get(URL).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        FormService.constructSurveyData(response.data.data.surveyForms[0]).then ( function (surveyData) {
        	$scope.surveyData = surveyData;
        });
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("failure ", response);
        alert(response.status + '\n' + response.data.message);
    });

    $scope.surveySubmit = function ($event) {
    	console.log($event);
    }
}]);