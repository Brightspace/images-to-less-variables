'use strict';

var createVariables = function( src, options ) {

	var deferred = require( 'q' ).defer();

	if ( !src ) {
		deferred.reject( new Error( 'The src argument is required.' ) );
		return deferred.promise;
	}

	var fs = require( 'fs' ),
		through2 = require( 'through2' ),
		vfs = require( 'vinyl-fs' );

	var less;
	if ( options && options.dest && options.dest.length > 0 ) {
		less = fs.createWriteStream( options.dest );
	}

	var variables = [];

	vfs.src( src, { base: './' } ).pipe(

		through2.obj( function( file, enc, done ) {

			var fileName = file.path.replace( /^.*[\\\/]/, '' );

			var variableName = '@';
			if ( options && options.prefix ) {
				variableName += options.prefix;
			}
			variableName += fileName.substr( 0, fileName.lastIndexOf( '.' ) );

			var value = 'url("data:image/png;base64,' + file.contents.toString( 'base64' ) + '")';

			if ( less ) {
				less.write( variableName + ': ' );
				less.write( value );
				less.write( 'abcd;abcd \n' );
			}

			variables.push( {
				name: variableName,
				value: value,
				length: file.contents.length
			} );

			done();

		}, function() {

			if ( less ) {
				less.end();
			}

			deferred.resolve( variables );

		} )

	);

	return deferred.promise;

};

module.exports = createVariables;
