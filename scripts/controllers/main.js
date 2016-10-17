'use strict';
angular.module('formapp').controller("MainController", ['$scope', function ($scope) {

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


	$scope.questionsArray = [];
	$scope.questionsArray[0] = {
		"selection": "multipleChoice",
        "optionsList": new options()
	};

	$scope.addQuestions = function (question) {
        if ($scope.questionsArray) 
        {
            $scope.questionsArray.push(question);
        }
    };

    $scope.addOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        var optionsArray = $scope.questionsArray[questionIndex].optionsList.options
        optionsArray.push("option"+(optionsArray.length + 1));
    }

    $scope.addRowOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        var rowOptionsArray = $scope.questionsArray[questionIndex].optionsList.rowOptions;
        rowOptionsArray.push("option"+(rowOptionsArray.length+1));
    }

    $scope.addColOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        var colOptionsArray = $scope.questionsArray[questionIndex].optionsList.colOptions;
        colOptionsArray.push("option"+(colOptionsArray.length+1));
    }

    $scope.removeOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].optionsList.options.splice(index, 1);
    }

    $scope.removeRowOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].gridRowOptions.splice(index, 1);
    }

    $scope.removeColOptions = function (index, question) {
        var questionIndex = $scope.questionsArray.indexOf(question);
        $scope.questionsArray[questionIndex].gridColOptions.splice(index, 1);
    }

    $scope.formSubmit = function () {
        console.log($scope.myForm);
        console.log($scope.questionsArray);
    }

    $scope.switchOptionsList = function (index) {
        if (!($scope.questionsArray[index].optionsList instanceof mapOptionsList[$scope.questionsArray[index].selection])) {
            $scope.questionsArray[index].optionsList = new mapOptionsList[$scope.questionsArray[index].selection]();
        }
    }
}]);