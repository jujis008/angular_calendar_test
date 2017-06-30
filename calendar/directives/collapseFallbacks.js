'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('CollapseFallbackCtrl', function($scope, $attrs, $element){
	$scope.$watch($attrs.CollapseFallback, function(shouldCollapse) {
		if(shouldCollapse){
			$element.addClass('ng-hide');
		} else {
			$element.removeClass('ng-hide');
		}
	});	
}).directive('collapseFallback', function($injector){
	if ($injector.has('uibCollapseDirective')) {
		return {};
	};

	// Runs during compile
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		controller: 'CollapseFallbackCtrl',
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
	};
});