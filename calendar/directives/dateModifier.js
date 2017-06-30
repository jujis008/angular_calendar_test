'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('DateModifierCtrl', function($element, $attrs, $scope, moment){
	var self = this;

	function onClick() {
		if (angular.isDefined($attrs.setToToday)) {
			self.date = new Date();
		} else if(angular.isDefined($attrs.increment)){
			self.date = moment(self.date).add(1, self.increment).toDate();
		} else if(angular.isDefined($attrs.decrement)){
			self.date = moment(self.date).subtract(1, self.decrement).toDate();
		};

		$scope.$apply();
	}

	$element.bind('click', onClick);
	$scope.$on('$destroy', function() {
		$element.unbind('click', onClick);
	});
}).directive('dateModifierCtrl', function(){
	// Runs during compile
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		controller: 'DateModifierCtrl as self',
		scope: {
			date: '=',
			increment: '=',
			decrement: '='
		}, // {} = isolate, true = child, false/undefined = no change
		bindToController: true
		// name: '',
		// priority: 1,
		// terminal: true,
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			
	};
});