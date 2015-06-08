'use strict';

describe('formatters', function() {

	describe('less', function() {

		var lessFormatter = require('../lib/formatters/less');

		it('should create less variable', function() {

			expect(lessFormatter.format('myvar', 'somevalue')).toBe('@myvar: somevalue;');

		});

	});

	describe('scss', function() {

		var scssFormatter = require('../lib/formatters/scss');

		it('should create scss variable', function() {

			expect(scssFormatter.format('myvar', 'somevalue')).toBe('$myvar: somevalue;');

		});

	});

});
