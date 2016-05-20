'use strict';

var formatVariable = function(name, value) {
	return '@' + name + ': ' + value + ';';
};

var formatPng = function (base64EncodedPng) {
	return 'url("data:image/png;base64,' + base64EncodedPng + '")';
}

var formatSvg = function (uriEncodedSvg) {
	return 'url("data:image/svg+xml,' + uriEncodedSvg + '")';
}

module.exports = {
	'name': 'less',
	'formatVariable': formatVariable,
	'formatPng': formatPng,
	'formatSvg': formatSvg,
};
