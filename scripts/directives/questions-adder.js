'use strict';

angular.module('formapp').directive("questionsAdder", [function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            function options () {
                this.options = ["option1"];
            };
            var question = {
                "selection": "multipleChoice",
                "optionsList": new options()
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