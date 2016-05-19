'use strict';

describe('formatters', function() {

	describe('less', function () {

		var lessFormatter = require('../lib/formatters/less');

		it('should create less variable', function () {

			expect(lessFormatter.formatVariable('myvar', 'somevalue')).toBe('@myvar: somevalue;');

		});

		it('should format svg', function () {

			expect(lessFormatter.formatSvg('bleh')).toBe('url("data:image/svg+xml,bleh")');

		});

		it('should format png', function () {

			expect(lessFormatter.formatPng('bleh')).toBe('url("data:image/png;base64,bleh")');

		});

	});

	describe('scss', function() {

		var scssFormatter = require('../lib/formatters/scss');

		it('should create scss variable', function() {

			expect(scssFormatter.formatVariable('myvar', 'somevalue')).toBe('$myvar: somevalue;');

		});

		it('should format svg', function () {

			expect(scssFormatter.formatSvg('bleh')).toBe('"url(\\"data:image/svg+xml,bleh\\")"');

		});

		it('should format png', function () {

			expect(scssFormatter.formatPng('bleh')).toBe('"url(\\"data:image/png;base64,bleh\\")"');

		});

	});

});
