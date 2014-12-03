'use strict';

var imagesToLess = require('../'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'createVariables', function() {

	var imagesPath = path.join( dataPath, '*.png' );
	var expectedLength = 477;
	var expectedValueCompressed = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEX///+0ODi0ODi0ODi0ODi1OzvERkbESEjESUneYWHfZGTgaGjhbGzhb2/ic3PjdnbkenrkfX3lgYHmhIXokZHomZnroKDN9k3IAAAABHRSTlMAEICf9IbTdAAAAEdJREFUGFfFz7kRgDAMAMH1UwD9N0kDSCLgGVwB2c1mN6F3kImJNraG2h+gEo0bqhLqhad/gNQXyMPsH4gIxgLENTOhAmLACWvtICC//BPwAAAAAElFTkSuQmCC")';

	it( 'should create Less variable for image', function( done ) {

		imagesToLess( imagesPath, { minify: { log: true } } ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( '@icon' );
			expect( variables[0].length ).toBe( expectedLength );
			expect( variables[0].value ).toBe( expectedValueCompressed );
			done();
		} );

	} );

	it( 'should prefix the Less variable for image', function( done ) {

		imagesToLess( imagesPath, { prefix: 'abc-' } ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( '@abc-icon' );
			expect( variables[0].length ).toBe( expectedLength );
			expect( variables[0].value ).toBe( expectedValueCompressed );
			done();
		} );

	} );

	it( 'should create a file containing the Less variables if dest option is specified', function( done ) {

		var lessPath = path.join( __dirname, 'test.less' );
		imagesToLess( imagesPath, { dest: lessPath } ).then( function() {

			var fs = require( 'fs' );

			fs.readFile( lessPath, function( err, contents ) {
				expect( contents.toString() ).toBe( '@icon: ' + expectedValueCompressed + ';\n' );
				done();
			} );

		} );

	} );

	it( 'should reject on invalid src argument', function( done ) {
		imagesToLess().catch( function( err ) {
			expect( err.message ).toBe( 'The src argument is required.' );
			done();
		} );
	} );

	it( 'should log optimization message to console', function( done ) {

		spyOn( console, 'log' );

		imagesToLess( imagesPath, { minify: { log: true } } ).then( function( variables ) {
			expect( console.log ).toHaveBeenCalled();
			done();
		} );

	} );

	it( 'should not log optimization message to console', function( done ) {

		spyOn( console, 'log' );

		imagesToLess( imagesPath, { minify: { log: false } } ).then( function( variables ) {
			expect( console.log ).not.toHaveBeenCalled();
			done();
		} );

	} );

} );
