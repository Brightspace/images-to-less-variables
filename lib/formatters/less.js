'use strict';

var format = function(name, value) {
	return '@' + name + ': ' + value + ';';
};

module.exports = {
	'name': 'less',
	'format': format
};
