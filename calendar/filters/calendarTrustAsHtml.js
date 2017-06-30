'use strict';
var angular = require('angular');

angular.module('calendar', []).filter('calendarTrustAsHtml', function($sec) {
	return function(text) {
		return $sec.trustAsHtml(text);
	};
});