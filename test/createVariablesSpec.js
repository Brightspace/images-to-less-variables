'use strict';

var imagesToLess = require('../'),
	path = require('path');

var dataPath = path.join( __dirname, 'data' );

describe( 'createVariables', function() {

	var imagesPath = path.join( dataPath, '*.png' );
	var expectedLength = 477;
	var expectedValue = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3QwQDjsk/bI5LAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAARVBMVEX///+0ODi0ODi0ODi0ODi1OzvERkbESEjESUneYWHfZGTgaGjhbGzhb2/ic3PjdnbkenrkfX3lgYHmhIXokZHomZnroKDN9k3IAAAABHRSTlMAEICf9IbTdAAAAEdJREFUGFfFz7kRgDAMAMH1UwD9N0kDSCLgGVwB2c1mN6F3kImJNraG2h+gEo0bqhLqhad/gNQXyMPsH4gIxgLENTOhAmLACWvtICC//BPwAAAAAElFTkSuQmCC")';

	it( 'Should create Less variable for image', function( done ) {

		imagesToLess( imagesPath ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( '@icon' );
			expect( variables[0].length ).toBe( expectedLength );
			expect( variables[0].value ).toBe( expectedValue );
			done();
		} );

	} );

	it( 'Should prefix the Less variable for image', function( done ) {

		imagesToLess( imagesPath, { prefix: 'abc-' } ).then( function( variables ) {
			expect( variables.length ).not.toBe( 0 );
			expect( variables[0].name ).toBe( '@abc-icon' );
			expect( variables[0].length ).toBe( expectedLength );
			expect( variables[0].value ).toBe( expectedValue );
			done();
		} );

	} );

	it( 'Should create a file containing the Less variables if dest option is specified', function( done ) {

		var lessPath = path.join( __dirname, 'test.less' );
		imagesToLess( imagesPath, { dest: lessPath } ).then( function() {

			var fs = require( 'fs' );
			fs.readFile( lessPath, function( err, contents ) {
				expect( contents.toString( 'utf8' ) ).toBe( '@icon: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH3QwQDjsk/bI5LAAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aHAAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tInAAAARVBMVEX///+0ODi0ODi0ODi0ODi1OzvERkbESEjESUneYWHfZGTgaGjhbGzhb2/ic3PjdnbkenrkfX3lgYHmhIXokZHomZnroKDN9k3IAAAABHRSTlMAEICf9IbTdAAAAEdJREFUGFfFz7kRgDAMAMH1UwD9N0kDSCLgGVwB2c1mN6F3kImJNraG2h+gEo0bqhLqhad/gNQXyMPsH4gIxgLENTOhAmLACWvtICC//BPwAAAAAElFTkSuQmCC"); \n' );
				done();
			} );

		} );

	} );

	it( 'Should reject on invalid src argument', function( done ) {
		imagesToLess().catch( function( err ) {
			expect( err.message ).toBe( 'The src argument is required.' );
			done();
		} );
	} );

} );
