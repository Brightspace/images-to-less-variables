'use strict';

var format = function(name, value) {
	return '@' + name + ': ' + value + ';';
};

module.exports = format;
