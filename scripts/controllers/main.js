'use strict';

angular.module('formapp').controller("MainController", ['$scope', function ($scope) {
	var answers = "option"
	$scope.questionsArray = [];
	$scope.questionsArray[0] = {
		"selection": "multipleChoice",
        "options": [1]
	};

	$scope.addQuestions = function (question) {
        if ($scope.questionsArray) 
        {
            $scope.questionsArray.push(question);
        }
    };

    $scope.addOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].options.push(index);
    }

    $scope.addRowOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].gridRowOptions.push(index);
    }

    $scope.addColOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].gridColOptions.push(index);
    }

    $scope.removeOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].options.splice(index, 1);
    }

    $scope.removeRowOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].gridRowOptions.splice(index, 1);
    }

    $scope.removeColOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].gridColOptions.splice(index, 1);
    }

    
}]);