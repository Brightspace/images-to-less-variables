'use strict';

var coveralls = require('gulp-coveralls'),
	gulp = require('gulp'),
	istanbul = require('gulp-istanbul'),
	jasmine = require('gulp-jasmine');

gulp.task( 'coverage', function() {
	return gulp.src( 'coverage/**/lcov.info' )
		.pipe( coveralls() );
} );

gulp.task( 'default', function( cb ) {
	gulp.src( ['lib/**/*.js'] )
		.pipe( istanbul() )
		.on( 'finish', function() {
			gulp.src( ['test/**/*Spec.js'] )
				.pipe( jasmine() )
				.pipe( istanbul.writeReports() )
				.on( 'end', cb );
		} );
} );
