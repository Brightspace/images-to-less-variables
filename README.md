# images-to-variables
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

A simple utility for generating Sass/Less variables for images.

## Installation

Install from NPM:
```shell
npm install images-to-variables
```

## Using from Node

To generate encoded image values from Node, call the `create` function.  A promise is returned and an array containing the encoded variables is passed to handlers:

```javascript
var imagesToVariables = require('images-to-variables');

imagesToVariables.create( '*.png' ).then( function( variables ) {
	console.log( variables[0].name );
	console.log( variables[0].length );
	console.log( variables[0].value );
} );
```

**A Note About Encoding:** currently, the `.png` contents are base-64 encoded so it can be safely included. For `.svg`, the contents are simply escaped as per [RFC 2397](http://tools.ietf.org/html/rfc2397).

### Options

#### Output File

Specify the `dest` option to write the variables directly to a file :

```javascript
imagesToVariables.create( '*.png', { dest: variables.less } );
```

#### Prefix Variables

Specify the `prefix` option to prefix the generated variables:

```javascript
imagesToVariables.create( '*.png', { prefix: 'vui-' } );
```

#### Sass

Specify the `scssFormatter` if you want scss variables:

```javascript
imagesToVariables.create(
	'*.png', {
		formatter: imagesToVariables.scssFormatter
	}
);
```

#### Less

The default variable format is Less, however you can explicitly specify the `lessFormatter` if desired:

```javascript
imagesToVariables.create(
	'*.png', {
		formatter: imagesToVariables.lessFormatter
	}
);
```

#### Compression

By default, images are minified using [imagemin](https://www.npmjs.com/package/imagemin) before encoding the variables. This can optionally be disabled by providing the `optimize` option:

```javascript
imagesToVariables.create( '*.png', { optimize: false } );
```

## Using from CLI

Creating variables from the CLI is a piece of cake.  For example, the following commands will generate Less and Scss files containing variables formatted for Less or Scss respectively. A variable is generated for each file represented by the `*.png` pattern, and the variables will be prefixed with `vui-`.

```javascript
imgtoless -p vui- -o variables.less *.png

imgtoscss -p vui- -o variables.scss *.png
```

**Note:** Currently, the images must be uniquely named.  The module currently does not handle duplicate file names spread across directories, but this could be added.


### Versioning and Releasing

This repo is configured to use `semantic-release`. Commits prefixed with `fix:` and `feat:` will trigger patch and minor releases when merged to `main`.

To learn how to create major releases and release from maintenance branches, refer to the [semantic-release GitHub Action](https://github.com/BrightspaceUI/actions/tree/main/semantic-release) documentation.


[npm-url]: https://www.npmjs.org/package/images-to-variables
[npm-image]: https://img.shields.io/npm/v/images-to-variables.svg
[ci-url]: https://travis-ci.org/Brightspace/images-to-variables
[ci-image]: https://travis-ci.org/Brightspace/images-to-variables.svg?branch=master
[coverage-url]: https://coveralls.io/r/Brightspace/images-to-variables?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/images-to-variables.svg
[dependencies-url]: https://david-dm.org/brightspace/images-to-variables
[dependencies-image]: https://img.shields.io/david/Brightspace/images-to-variables.svg
