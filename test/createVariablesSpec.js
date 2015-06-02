'use strict';

var imagesToLess = require('../lib/create'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'createVariables', function() {

	var imagesPath = path.join( dataPath, 'icon.png' );

	var expectedEmptyLength = 0;
	var expectedEmptyValue = 'url("data:image/png;base64,")';
	var expectedUncompressedLength = 477;
	var expectedUncompressedValue = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3QwQDjsk/bI5LAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAARVBMVEX///+0ODi0ODi0ODi0ODi1OzvERkbESEjESUneYWHfZGTgaGjhbGzhb2/ic3PjdnbkenrkfX3lgYHmhIXokZHomZnroKDN9k3IAAAABHRSTlMAEICf9IbTdAAAAEdJREFUGFfFz7kRgDAMAMH1UwD9N0kDSCLgGVwB2c1mN6F3kImJNraG2h+gEo0bqhLqhad/gNQXyMPsH4gIxgLENTOhAmLACWvtICC//BPwAAAAAElFTkSuQmCC")';
	var expectedCompressedLength = 228;
	var expectedCompressedValue = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEX///+0ODi0ODi0ODi0ODi1OzvERkbESEjESUneYWHfZGTgaGjhbGzhb2/ic3PjdnbkenrkfX3lgYHmhIXokZHomZnroKDN9k3IAAAABHRSTlMAEICf9IbTdAAAAEpJREFUGNPFz7kNgEAQA8C5gwLov0kaYHcJ7pGogMjWyIkb9A4ycaIdV0PdC6hEY0JVQm1Y/QdI/QP5OIcc0EXUPDAWEcQ8s2czXpV3HyAKn9Y1AAAAAElFTkSuQmCC")';

	beforeEach( function() {
		spyOn( console, 'log' ).and.callThrough();
	} );

	it( 'should create Less variable for uncompressed image', function( done ) {

		imagesToLess( imagesPath, { optimize: false } ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( 'icon' );
			expect( variables[0].length ).toBe( expectedUncompressedLength );
			expect( variables[0].value ).toBe( expectedUncompressedValue );
			done();
		} );

	} );

	it( 'should create Less variable for compressed image', function( done ) {

		imagesToLess( imagesPath ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( 'icon' );
			expect( variables[0].length ).toBe( expectedCompressedLength );
			expect( variables[0].value ).toBe( expectedCompressedValue );
			done();
		} );

	} );

	it( 'should create Less variable for empty image', function( done ) {

		imagesToLess( path.join( dataPath, 'empty.png' ) ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( 'empty' );
			expect( variables[0].length ).toBe( expectedEmptyLength );
			expect( variables[0].value ).toBe( expectedEmptyValue );
			done();
		} );

	} );

	it( 'should prefix the Less variable for image', function( done ) {

		imagesToLess( imagesPath, { prefix: 'abc-' } ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( 'abc-icon' );
			expect( variables[0].length ).toBe( expectedCompressedLength );
			expect( variables[0].value ).toBe( expectedCompressedValue );
			done();
		} );

	} );

	it( 'should create a file containing the Less variables if dest option is specified', function( done ) {

		var lessPath = path.join( __dirname, 'test.less' );
		imagesToLess( imagesPath, { dest: lessPath } ).then( function() {

			var fs = require( 'fs' );

			fs.readFile( lessPath, function( err, contents ) {
				expect( contents.toString() ).toBe( '@icon: ' + expectedCompressedValue + ';\n' );
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
		imagesToLess( imagesPath, { minify: { log: true } } ).then( function( variables ) {
			expect( console.log ).toHaveBeenCalled();
			done();
		} );
	} );

	it( 'should not log optimization message to console', function( done ) {
		imagesToLess( imagesPath, { minify: { log: false } } ).then( function( variables ) {
			expect( console.log ).not.toHaveBeenCalled();
			done();
		} );
	} );

} );
