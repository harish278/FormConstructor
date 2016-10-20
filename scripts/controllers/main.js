'use strict';
angular.module('formapp').controller("MainController", ['$scope', '$http', '$location', function ($scope, $http, $location) {
	$scope.formsList = [];
	var URL = "http://52.74.76.164:8001/api/v1/survey?limit=50";
	$http.get(URL).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $scope.formsList = response.data.data.surveyForms;
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log("failure ", response);
        alert(response.status + '\n' + response.data.message);
    });

    $scope.takeSurvey = function (surveyId) {
    	var surveyURL = "/survey/" + surveyId;
    	$location.path(surveyURL);
    }

    $scope.addNewSurvey = function () {
    	$location.path("/newform");
    }
}]);