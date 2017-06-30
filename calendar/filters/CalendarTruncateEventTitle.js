'use strict';

var angular = require('angular');

angular.module('calendar').filter('calendarTruncateEventTitle', function(){
	return function(string, length, boxHeight) {
		if (!string) {
			return '';
		};
		if (string.length >= length && string.length /20 > boxHeight / 30) {
			return string.substr(0, length) + '...';
		};
		return string;
	};
});

