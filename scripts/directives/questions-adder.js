'use strict';

angular.module('formapp').directive("questionsAdder", [function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            var question = {
                "selection": "multipleChoice",
                "options": [1]
            };
            $(element).click(function (event) {
                event.stopPropagation();
                scope.$apply(function () {
                    scope.addQuestions(question);
                });
            });

        }
    }
}]);