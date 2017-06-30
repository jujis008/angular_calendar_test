'use strict';
var angular = require('angular');

angular.module('calendar', []).controller('DropableCtrl', function($scope, $element, $parse, $attrs, interact){
	if (! interact) {
		return ;
	};

	var DROP_ACTIVE_CLASS = $attrs.dropActiveClass || 'drop-active';

	interact($element[0]).dropzone({
		ondragenter: function(event){
			angular.element(event.target).addClass(DROP_ACTIVE_CLASS);
		},
		ondragleave: function(event) {
			angular.element(event.target).removeClass(DROP_ACTIVE_CLASS);
		},
		ondropdeactivate: function(event){
			angular.element(event.target).removeClass(DROP_ACTIVE_CLASS);
		},
		ondrop: function(event){
			if (event.relatedTarget.dropData) {
				$parse($attrs.onDrop)($scope, {dropData: event.relatedTarget.dropData});
				$scope.apply();
			};
		}
	});
	$scope.$on('$destroy', function() {
		interact($element[0].unset());
	});

}).directive('Dropable', function() {
	return {
		restrict: 'A',
		controller: 'DropableCtrl'
	};
	
});