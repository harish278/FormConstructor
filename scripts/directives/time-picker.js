'use strict';

angular.module('formapp').directive("timePicker", [function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            $('.time').timepicker();
            var options = "";
            var minRange = "";
            var maxRange = "";
            if(attrs.timePicker) {
        		options = JSON.parse(attrs.timePicker);
        		minRange = Math.floor( options.rangeStart / 60);
        		maxRange = Math.floor( options.rangeEnd / 60);
        	}
        	$('.survey-time').timepicker({
        		'hourMin': minRange,
        		'hourMax': maxRange
        	});
        }
    }
}]);