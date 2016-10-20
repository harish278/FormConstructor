'use strict';

angular.module('formapp').directive("timePicker", [function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            $('.time').timepicker();
        }
    }
}]);