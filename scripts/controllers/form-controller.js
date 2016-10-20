'use strict';
angular.module('formapp').controller("FormController", ['$scope', '$http', '$location', 'FormService', function ($scope, $http, $location, FormService) {

    function options () {
        this.options = ["option1"];
    };

    function gridOptions () {
        this.rowOptions = ["option1"]
        this.colOptions = ["option1"]
    }

    function paragraph () {
        this.paragraph = null;
    }

    function linearScale () {
        this.lowerLimit = {
            value: 1,
            label: "option"
        };
        this.upperLimit = {
            value: 2,
            label: "option"
        }
    }

    function dateOption () {
        this.date = null;
    }

    function timeOption () {
        this.time = null;
    }

    var mapOptionsList = {
        'multipleChoice' : options,
        'dropboxes': options,
        'checkboxes': options,
        'multipleChoiceGrid': gridOptions,
        'paragraph': paragraph,
        'shortanswer': paragraph,
        'linearScale': linearScale,
        'date': dateOption,
        'time': timeOption
    }

    $scope.questionData = {
        "heading": "Untitled form",
        "description": "Form description"
    }
	$scope.questionData.questionsArray = [];
	$scope.questionData.questionsArray[0] = {
        "questionText": "Untitled question",
		"selection": "multipleChoice",
        "optionsList": new options(),
        "position": 1
	};

	$scope.addQuestions = function (question) {
        if ($scope.questionData.questionsArray) {
            question.position = $scope.questionData.questionsArray.length + 1;
            $scope.questionData.questionsArray.push(question);
        }
    };

    $scope.addOptions = function (index, question) {
        var questionIndex = $scope.questionData.questionsArray.indexOf(question);
        var optionsArray = $scope.questionData.questionsArray[questionIndex].optionsList.options
        optionsArray.push("option"+(optionsArray.length + 1));
    }

    $scope.addRowOptions = function (index, question) {
        var questionIndex = $scope.questionData.questionsArray.indexOf(question);
        var rowOptionsArray = $scope.questionData.questionsArray[questionIndex].optionsList.rowOptions;
        rowOptionsArray.push("option"+(rowOptionsArray.length+1));
    }

    $scope.addColOptions = function (index, question) {
        var questionIndex = $scope.questionData.questionsArray.indexOf(question);
        var colOptionsArray = $scope.questionData.questionsArray[questionIndex].optionsList.colOptions;
        colOptionsArray.push("option"+(colOptionsArray.length+1));
    }

    $scope.removeOptions = function (index, question) {
        var questionIndex = $scope.questionData.questionsArray.indexOf(question);
        $scope.questionData.questionsArray[questionIndex].optionsList.options.splice(index, 1);
    }

    $scope.removeRowOptions = function (index, question) {
        var questionIndex = $scope.questionData.questionsArray.indexOf(question);
        console.log(questionIndex);
        $scope.questionData.questionsArray[questionIndex].optionsList.rowOptions.splice(index, 1);
    }

    $scope.removeColOptions = function (index, question) {
        var questionIndex = $scope.questionData.questionsArray.indexOf(question);
        $scope.questionData.questionsArray[questionIndex].optionsList.colOptions.splice(index, 1);
    }

    $scope.formSubmit = function () {
        console.log(JSON.stringify($scope.questionData));
        FormService.constructFormData($scope.questionData).then(function (formData) {
            console.log(JSON.stringify(formData));
            $http.post("http://52.74.76.164:8001/api/v1/survey", formData).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log("success ", response);
                alert(response.status + '\n' + response.data["_id"] + '\n' + response.data.message);
                $location.path('/');
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("failure ", response);
                alert(response.status + '\n' + response.data.message);
            });
        });
    }

    $scope.switchOptionsList = function (index) {
        if (!($scope.questionData.questionsArray[index].optionsList instanceof mapOptionsList[$scope.questionData.questionsArray[index].selection])) {
            $scope.questionData.questionsArray[index].optionsList = new mapOptionsList[$scope.questionData.questionsArray[index].selection]();
        }
    }
}]);