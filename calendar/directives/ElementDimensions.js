'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('ElementDimensionsCtrl', function($element, $scope, $parse, $attrs, $window){
	function setDimensions() {
		$parse($attrs.ElementDimensions).assign($scope, {
			width: $element[0].offsetWidth - 1,
			height: $element[0].offsetHeight;
		});
		$scope.$applyAsync();
	}
	var win = angular.element($window);
	win.bind('resize', setDimensions);
	setDimensions();

	$scope.$on('$destroy', function(){
		win.unbind('resize', setDimensions);
	});
}).directive('ElementDimensions', function(){
	// Runs during compile
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		controller: ElementDimensionsCtrl
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
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});