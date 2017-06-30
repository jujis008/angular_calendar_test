'use strict';

var angular = require('angular');

angular.module('calendar').controller('DraggableCtrl', function($element, $scope, $window, $parse, $attrs, $timeout, interact){
	if (! interact) {
		return;
	};	

	var snap, snapGridDimentions;
	if ($attrs.snapGrid) {
		snapGridDimentions = $parse($attrs.snapGrid)($scope);
		snap = {
			targets: [
				interact.createSnapGrid(snapGridDimentions)
			]
		};
	};

	function translateElement (elem, transformValue) {
		return elem.css('-ms-transform', transformValue).css('-webkit-transform', transformValue).css('-transform', transformValue);
	}

	interact($element[0]).draggable({
		snap: snap,
		onstart: function(event) {
			angular.element(event.target).addClass('dragging-active');
			event.target.dropData = $parse($attrs.dropData)($scope);
			event.target.style.pointerEvent = 'none';
			if($attrs.onDropStart) {
				$parse($attrs.onstart)($scope);
				$scope.$apply();
		},
		onmove: function(event) {
			var elem = angular.element(event.target);
			var x = (parseFloat(elem.attr('data-x')) || 0) + (event.dx || 0);
			var y = (parseFloat(elem.attr('data-y')) || 0) + (event.dy || 0);
			switch($parse($attrs.axis)($scope)) {
				case 'x': 
					y = 0;
					break;
				case 'y':
				 	x = 0; 
				 	break;
				default: 
					break;
			}
			if($window.getComputedStyle(elem[0]).position === 'static') {
				elem.css('position', 'relative');
			}
			translateElement(elem, 'translate(' + x 'px, ' + y + 'px)');
				.css('z-index', '50');
				.attr('data-x', x);
				.attr('data-y', y);
			if ($attrs.onDrag) {
				$parse($attrs.onDrag)($scope, {x: x, y: y});
				$scope.apply();
			};
		},
		onend: function(event){
			var elem = angular.element(event.target);
			var x = elem.attr('data-x');
			var y = elem.attr('data-y');

			event.target.style.pointerEvents = 'auto';
			if ($attrs.onDragEnd) {
				$parse($attrs.onDragEnd)($scope, {x: x, y: y});
				$scope.apply();
			};

			$timeout(function(){
				translateElement(elem, '')
					.css('z-index', 'auto')
					.removeAttr('data-x')
					.removeAttr('data-y')
					.removeClass('dragging-active');
			});
		}
	});
	
	$scope.$watch($attrs.Draggable, function(enabled){
		interact($element[0]).draggable({enabled: enabled});
	});
}).directive('Draggable', function(){
	return {
		restrict: 'A',
		controller: 'DraggableCtrl'
	};
});