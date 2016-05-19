'use strict';

var imagesToVariables = require('../lib/create'),
	path = require('path');

var dataPath = path.join(__dirname, 'data');

describe('createVariables', function() {

	var imagesPath = path.join(dataPath, 'icon.png');

	beforeEach( function() {
		spyOn(console, 'log').and.callThrough();
	} );

	it('should prefix the variable for image', function(done) {

		imagesToVariables(imagesPath, { prefix: 'abc-' }).then(function(variables) {
			expect(variables.length).not.toBe(0);
			expect(variables[0].name).toBe('abc-icon');
			done();
		});

	});

	it('should default to Less variables', function(done) {

		imagesToVariables(imagesPath).then(function(variables) {
			expect(variables.length).not.toBe(0);
			expect(variables[0].format).toBe('less');
			done();
		});

	});

	it('should use Less formatter if provided', function(done) {

		var formatter = require('../lib/formatters/less');

		spyOn(formatter, 'formatVariable').and.callThrough();

		imagesToVariables(imagesPath).then(function(variables) {
			expect(variables.length).not.toBe(0);
			expect(variables[0].format).toBe('less');
			expect(console.log).toHaveBeenCalled();
			done();
		});

	});

	it('should use Scss formatter if provided', function(done) {

		var formatter = require('../lib/formatters/scss');

		imagesToVariables(imagesPath, { formatter: formatter }).then(function(variables) {
			expect(variables.length).not.toBe(0);
			expect(variables[0].format).toBe('scss');
			done();
		});

	});

	it('should reject on invalid src argument', function(done) {
		imagesToVariables().catch(function(err) {
			expect(err.message).toBe('The src argument is required.');
			done();
		});
	});

	it('should reject if file does not have extension', function(done) {
		imagesToVariables(path.join(dataPath, 'invalid')).catch(function(err) {
			expect(err.message).toBe('Unsupported file type.');
			done();
		});
	});

	it('should reject if file does not have supported extension', function(done) {
		imagesToVariables(path.join(dataPath, 'invalid.abc')).catch(function(err) {
			expect(err.message).toBe('Unsupported file type.');
			done();
		});
	});

	it('should log optimization message to console', function(done) {
		imagesToVariables(imagesPath, { minify: { log: true } }).then(function(variables) {
			expect(console.log).toHaveBeenCalled();
			done();
		});
	});

	it('should not log optimization message to console', function(done) {
		imagesToVariables(imagesPath, { minify: { log: false } }).then(function(variables) {
			expect(console.log).not.toHaveBeenCalled();
			done();
		});
	});

});
