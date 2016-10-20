'use strict';

angular.module('formapp').directive("datePicker", [function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
        	$('.date').datepicker({"dateformat":"dd-mm-yyyy"});
        	var options = "";
        	if(attrs.datePicker) {
        		options = JSON.parse(attrs.datePicker);
        	}
        	$('.survey-date').datepicker({
        		"dateformat":"dd-mm-yyyy",
        		"minDate": new Date(options.dateStartRange),
        		"maxDate": new Date(options.dateEndRange)
        	});
        }
    }
}]);