'use strict';

angular.module('formapp').directive("selectActive", [function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
        	function clickFunction () {
        		$(".questions").removeClass('active');
	        	element.addClass('active');
        	}

        	element.click(clickFunction);
        	clickFunction();
        }
    }
}]);