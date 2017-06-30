'use strict';

var angular = require('angular');

angular.module('calendar', []).controller('ResizableCtrl', function($element, $scope, $parse, $attrs, $timeout, interact){
	if (!interact) {
		return;
	};

	var snap, snapGridDimensions;
	if ($attrs.snapGrid) {
		snapGridDimensions = $parse($attrs.snapGrid)($scope);
		snap = {
			targets: [interact.createSnapGrid(snapGridDimensions)]
		};
	};

	var originalDimensions = {};
	var originalDimensionsStyle = {};
	var resizeEdge; 

	function getUnitsResized(edge, elem) {
		var unitsResized = {};
		unitsResized.edge = edge;
		if (edge === 'start') {
			unitsResized.x = elem.data('x');
			unitsResized.y = elem.data('y');
		} else if (edge === 'end') {
			unitsResized.x = parseFloat(elem.css('width').replace('px', '') - originalDimensions.width);
			unitsResized.y = parseFlot(elem.css('height').replace('px', '') - originalDimensions.height);
		};
		return unitsResized;
	}

	interact($element[0]).resizable({
		edges: $parse($attrs.resizeEdges)($scope),
		snap: snap,
		onstart: function(event) {
			resizeEdge = 'end';
			var elm = angular.element(event.target);
			originalDimensions.height = elm[0].offsetHeight;
			originalDimensions.width = elm[0].offsetWidth;
			originalDimensionsStyle.height = elm.css('height');
			originalDimensionsStyle.width = elm.css('width');
		},
		onmove: function(event) {
			if (event.rect.width > 0 && event.rect.height > 0) {
				var elm = angular.element(event.target);
				var x = parseFloat(elm.data('x') || 0);
				var y = parseFloat(elm.data('y') || 0);
				elm.css({
					width: event.rect.width + 'px',
					height: event.rect.height + 'px'
				});

				x += event.deltaRect.left;
				y += event.deltaRect.top;

				elm.css('transform', 'translate(' + x +'px, ' + y + 'px)');
				elm.data('x', x);
				elm.data('y', y);

				if (event.deltaRect.left !==0 || event.deltaRect.top !== 0) {
					resizeEdge = 'start';
				};
				if ($attrs.onResize) {
					$parse($attrs.onResize)($scope, getUnitsResized(resizeEdge, elm));
					$scope.$apply();
				};
			};
		},
		onend: function(event) {
			var elm = angular.element(event.target);
			var unitsResized = getUnitsResized(resizeEdge, elm);
			$timeout(function(){
				elm.data('x', null).data('x', null),css({
					transform: '',
					width: originalDimensionsStyle.width,
					height: originalDimensionsStyle.height
				});
			});
			if ($attrs.onResizeEnd) {
				$parse($attrs.onResizeEnd)($scope, unitsResized);
				$scope.$apply();
			};
		}

	});
	$scope.$watch($attrs.Resizable, function(enabled){
		interact($element[0]).resizable({enabled: enabled});
	});

	$scope.$on('$destroy', function() {
		interact($element[0]).unset();
	});
}).directive('Resizable', function(){
	// Runs during compile
	return {
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		controller: ResizableCtrl
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