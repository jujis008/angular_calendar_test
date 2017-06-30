'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('CalendarSlideBox', function($scope, $timeout, calendarConfig, calendarEventTitle){
	var self = this;
	self.calendarConfig = calendarConfig;
	self.calendarEventTitle = calendarEventTitle;

	self.isCollapsed = true;
	$scope.$watch('self.isOpen', function(isOpen){
		//events must be populated first to set the element height before animation will work
		$timeout(function(){
			self.isCollapsed = !isOpen;
		});
	});
}).directive('calendarSlideBox', function(){
	// Runs during compile
	return {
		template: '<div calendar-dynamic-directive-template name="calendarSlideBox" overrides="self.customTemplateUrls"><div>',
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		controller: 'CalendarSlideBox as self',
		replace: true,
		require: ['^CalendarMonth', '^CalendarYear'], // Array = multiple requires, ? = optional, ^ = check parent elements
		scope: {
			isOpen: '=',
			events: '=',
			onEventClick: '=',
			cell: '=',
			customTemplateUrls: '=?',
			templateScope: '='
		}, // {} = isolate, true = child, false/undefined = no change
		// name: '',
		// priority: 1,
		// terminal: true,
		// templateUrl: '',
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, elem, attrs, ctrls) {
			scope.isMonthView !!= ctrls[0];
			scope.isYearView !!= ctrls[1];
		},
		bindToController: true
	};
});