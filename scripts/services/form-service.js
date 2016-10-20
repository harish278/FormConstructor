'use strict';
angular.module('formapp').service('FormService', function($q) {
	this.constructFormData = function (questionData) {
		var formData = {};
		var deffered = $q.defer();
		formData.title = questionData.heading;
		formData.isShareAggregatedResult = true;
		formData.multiChoiceElements = [];
		formData.numberElements = [];
		formData.textElements = [];
		formData.dateElements = [];
		formData.timeElements = [];
		questionData.questionsArray.forEach(function (question) {
			var obj = {};
			switch (question.selection) {
				case "shortanswer":
					obj.caption = question.questionText;
					obj.position = question.position;
					obj.minimumCharLimit = 10;
					obj.maximumCharLimit = 50;
					obj.isRequired = true;
					formData.textElements.push(obj);
					break;
				case "paragraph":
					obj.caption = question.questionText;
					obj.position = question.position;
					obj.minimumCharLimit = 20;
					obj.maximumCharLimit = 500;
					obj.isRequired = true;
					formData.textElements.push(obj);
					break;
				case "multipleChoice":
					obj.caption = question.questionText;
					obj.position = question.position;
					obj.options = question.optionsList.options;
					obj.validation = "string";
					obj.isRequired = true;
					obj.isMultiSelect = false;
					obj.typeOfElement = "RADIO"
					formData.multiChoiceElements.push(obj);
					break;
				case "checkboxes":
					obj.caption = question.questionText;
					obj.position = question.position;
					obj.options = question.optionsList.options;
					obj.validation = "string";
					obj.isRequired = true;
					obj.isMultiSelect = false;
					obj.typeOfElement = "CHECK_BOX"
					formData.multiChoiceElements.push(obj);
					break;
				case "dropboxes":
					obj.caption = question.questionText;
					obj.position = question.position;
					obj.options = question.optionsList.options;
					obj.validation = "string";
					obj.isRequired = true;
					obj.isMultiSelect = false;
					obj.typeOfElement = "DROP_DOWN"
					formData.multiChoiceElements.push(obj);
					break;
				case "linearScale":
					obj.caption = question.questionText;
					obj.position = question.position;
					obj.rangeStart = question.optionsList.lowerLimit.value;
					obj.rangeEnd = question.optionsList.upperLimit.value;
					obj.isRequired = true;
					formData.numberElements.push(obj);
					break;
		        case "date":
					obj.caption = question.questionText;
					obj.position = question.position;
					var startDate = new Date(question.optionsList.dateStartRange).toISOString().split('T')[0];
					obj.dateRangeStart = startDate.split('-').reverse().join('-');
					var endDate = new Date(question.optionsList.dateEndRange).toISOString().split('T')[0];
					obj.dateRangeEnd = endDate.split('-').reverse().join('-');
					obj.isRequired = true;
					formData.dateElements.push(obj);
					break;
				case "time":
					obj.caption = question.questionText;
					obj.position = question.position;
					var timeStartrange = question.optionsList.rangeStart.split(':')[0] * 60;
					timeStartrange = timeStartrange + Number(question.optionsList.rangeStart.split(':')[1]);
					obj.rangeStart = timeStartrange;
					console.log(question.optionsList.rangeEnd.split(':')[0]);
					var timeEndrange = question.optionsList.rangeEnd.split(':')[0] * 60;
					timeEndrange = timeEndrange + Number(question.optionsList.rangeEnd.split(':')[1]);
					obj.rangeEnd = timeEndrange;
					obj.isRequired = true;
					formData.timeElements.push(obj);
					break;
			}
		});
		deffered.resolve(formData);
		return deffered.promise;
	};

	this.constructSurveyData = function (formData) {
		var questionData = {};
		var deffered = $q.defer();
		questionData.heading = formData.title;
		questionData._id = formData._id;
		questionData.questionsArray = [];
		if (formData.multiChoiceElements.length >0) {
			formData.multiChoiceElements.forEach (function (obj) {
				var question = {};
				question.optionsList = {};
				if (obj.typeOfElement === "RADIO") {
					question.questionText = obj.caption;
					question.position = obj.position;
					question.optionsList.options = obj.options;
					question.validation = obj.validation;
					question.isRequired = obj.isRequired;
					question.isMultiSelect = obj.isMultiSelect;
					question.selection = "multipleChoice";
					question._id = obj._id;
					questionData.questionsArray.push(question);
				}
				if (obj.typeOfElement === "DROP_DOWN") {
					question.questionText = obj.caption;
					question.position = obj.position;
					question.optionsList.options = obj.options;
					question.validation = obj.validation;
					question.isRequired = obj.isRequired;
					question.isMultiSelect = obj.isMultiSelect;
					question.selection = "dropboxes";
					question._id = obj._id;
					questionData.questionsArray.push(question);
				}
				if (obj.typeOfElement === "CHECK_BOX") {
					question.questionText = obj.caption;
					question.position = obj.position;
					question.optionsList.options = obj.options;
					question.validation = obj.validation;
					question.isRequired = obj.isRequired;
					question.isMultiSelect = obj.isMultiSelect;
					question.selection = "checkboxes";
					question._id = obj._id;
					questionData.questionsArray.push(question);
				}
			});
		}
		if (formData.numberElements.length > 0) {
			formData.numberElements.forEach (function (obj) {
				var question = {};
				question.optionsList = {};
				question.optionsList.lowerLimit = {};
				question.optionsList.upperLimit = {};
				question.questionText = obj.caption;
				question.position = obj.position;
				question.optionsList.lowerLimit.value = obj.rangeStart;
				question.optionsList.upperLimit.value = obj.rangeEnd;
				question.validation = obj.validation;
				question.isRequired = obj.isRequired;
				question.selection = "linearScale";
				question._id = obj._id;
				questionData.questionsArray.push(question);
			});
		}

		if (formData.textElements.length > 0) {
			formData.textElements.forEach (function (obj) {
				var question = {};
				question.questionText = obj.caption;
				question.position = obj.position;
				question.minimumCharLimit = obj.minimumCharLimit;
				question.maximumCharLimit = obj.maximumCharLimit;
				question.isRequired = obj.isRequired;
				question.selection = "shortanswer";
				question._id = obj._id;
				questionData.questionsArray.push(question);
			});
		}

		if (formData.dateElements.length > 0) {
			formData.dateElements.forEach (function (obj) {
				var question = {};
				question.optionsList = {};
				question.questionText = obj.caption;
				question.position = obj.position;
				question.optionsList.dateStartRange = obj.dateRangeStart;
				question.optionsList.dateEndRange = obj.dateRangeEnd;
				question.isRequired = obj.isRequired;
				question.selection = "date";
				question._id = obj._id;
				questionData.questionsArray.push(question);
			});
		}

		if (formData.timeElements.length > 0) {
			formData.timeElements.forEach (function (obj) {
				var question = {};
				question.optionsList = {};
				question.questionText = obj.caption;
				question.position = obj.position;
				question.optionsList.rangeStart = obj.rangeStart;
				question.optionsList.rangeEnd = obj.rangeEnd;
				question.isRequired = obj.isRequired;
				question.selection = "time";
				question._id = obj._id;
				questionData.questionsArray.push(question);
			});
		}

		deffered.resolve(questionData);
		return deffered.promise;
	};

});