'use strict';

var assign = require('object-assign'),
	fs = require('fs'),
	minify = require('./minify'),
	q = require('q'),
	through2 = require('through2'),
	vfs = require('vinyl-fs');

var createVariables = function( src, options ) {

	var deferred = q.defer();

	if ( !src ) {
		deferred.reject( new Error( 'The src argument is required.' ) );
		return deferred.promise;
	}

	options = assign( { optimize: true, minify: { log: true } }, options || {} );

	var variableStream;
	if ( options.dest && options.dest.length > 0 ) {
		variableStream = fs.createWriteStream( options.dest );
	}

	var format = options.formatter;
	if ( !format ) {
		format = require('./formatters/less');
	}

	var variables = [];

	vfs.src( src, { base: './' } ).pipe(

		through2.obj( function( file, enc, done ) {

			var writeVariable = function( tempFile ) {

				var fileName = file.path.replace( /^.*[\\\/]/, '' );

				var variableName = '';
				if ( options.prefix ) {
					variableName += options.prefix;
				}
				variableName += fileName.substr( 0, fileName.lastIndexOf( '.' ) );

				var value = 'url("data:image/png;base64,' + tempFile.contents.toString( 'base64' ) + '")';

				if ( variableStream ) {
					variableStream.write( format( variableName, value ) + '\n' );
				}

				variables.push( {
					name: variableName,
					value: value,
					length: tempFile.contents.length
				} );

			};

			if ( options.optimize ) {
				minify( file, options.minify ).then( function( minified ) {
					writeVariable( minified );
					done();
				} ).catch( function() {
					deferred.reject( new Error( 'Minify failed.' ) );
					done();
				} );
			} else {
				writeVariable( file );
				done();
			}

		}, function() {

			if ( variableStream ) {
				variableStream.end();
			}

			deferred.resolve( variables );

		} )

	);

	return deferred.promise;

};

module.exports = createVariables;
