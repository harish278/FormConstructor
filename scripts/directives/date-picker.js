'use strict';

angular.module('formapp').directive("datePicker", [function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
        	$('.date').datepicker({"dateformat":"dd-mm-yyyy"});
        }
    }
}]);