'use strict';

var assign = require('object-assign'),
	chalk = require('chalk'),
	Imagemin = require('imagemin'),
	q = require('q');

var minify = function(file, options) {

	var deferred = q.defer();

	options = assign({ log: true }, options || {});

	var imagemin = new Imagemin()
		.src(file.contents)
		.use(Imagemin.optipng({ optimizationLevel: 3 }))
		.use(Imagemin.svgo());

	imagemin.run(function (err, files) {

		if (err) {
			deferred.reject(err);
			return deferred.promise;
		}

		if (files === undefined || files.length === 0) {
			deferred.reject('Imagemin did not return a minified image.');
			return deferred.promise;
		}

		if (options.log) {

			var bytesSaved = file.contents.length - files[0].contents.length;
			var percentSaved = 0;
			if (file.contents.length > 0) {
				percentSaved = (bytesSaved * 100 / file.contents.length).toFixed(1);
			}

			console.log(
				'Optimize: ' + file.relative + ' ' +
					chalk.green(files[0].contents.length + 'B ') +
					chalk.gray('compression ' + percentSaved + '%')
			);

		}

		deferred.resolve(files[0]);

	} );

	return deferred.promise;

};

module.exports = minify;
