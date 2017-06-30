'use strict';

var angular = require('angular');
angular.module('calendar').controller('DragSelectCtrl', function($scope, $element, $parse, $attrs){
	function handleMouseEvent(callbackName){
		return function(event){
			if (callbackName) {
				$parse(callbackName)($scope);
				$scope.$apply();
			};
			event.preventDefault();
		};
	}

	var onMouseDown = handleMouseEvent($attrs.onDragSelectStart);
	var onMouseMove = handleMouseEvent($attrs.onDragSelectMove);
	var onMouseUp = handleMouseEvent($attrs.onDragSelectEnd);

	function enableMouseListeners() {
		$element.on('mousedown', onMouseDown);
		$element.on('mousemove', onMouseMove);
		$element.on('mouseup', onMouseUp);
	}

	function disableMouseListeners() {
		$element.off('mousedown', onMouseDown);
		$element.off('mousemove', onMouseMove);
		$element.off('mouseup', onMouseUp);
	}

	$scope.$watch($attrs.DragSelect, function(isEnable){
		if (isEnable) {
			enableMouseListeners();
		} else{
			disableMouseListeners();
		};
	});

	$scope.$on('$destory', function() {
		disableMouseListeners();
	});

}).directive('DragSelect', function() {
	return {
		restrict: 'A',
		controller('DragSelectCtrl')
	};
});
