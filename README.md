# images-to-less-variables
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][dependencies-image]][dependencies-url]

A simple utility for generating Less variables for images.

## Installation

Install from NPM:
```shell
npm install images-to-less-variables
```

## Usage

To generate Less variables containing 64-bit encoded images, the module's function can be called. A promise is returned and an array containing the variables is passed to handlers:

```javascript
var createImageVariables = require('images-to-less-variables');

createImageVariables( '*.png' ).then( function( variables ) {
	console.log( variables[0].name );
	console.log( variables[0].length );
	console.log( variables[0].value );
} );
```

Alternatively, the variables can be written directly to an optional output file:

```javascript
var createImageVariables = require('images-to-less-variables');

createImageVariables( '*.png', { dest: 'image-variables.less' } );
```

In addition, a prefix can be optionally prepended to each variable name. This is sometimes useful to avoid collisions with other variables.

```javascript
var createImageVariables = require('images-to-less-variables');

createImageVariables( '*.png', { prefix: 'my-ns-' } );
```

By default, images are compressed before base-64 encoding for the variables.  This can be explicitly set as well:

```javascript
var createImageVariables = require('images-to-less-variables');

createImageVariables( '*.png', { optimize: false } );
```

**Note:** Currently, the images must be uniquely named.  The module currently does not handle duplicate file names spread across directories, but this could be added.

[npm-url]: https://www.npmjs.org/package/images-to-less-variables
[npm-image]: https://img.shields.io/npm/v/images-to-less-variables.svg
[ci-url]: https://travis-ci.org/Brightspace/images-to-less-variables
[ci-image]: https://travis-ci.org/Brightspace/images-to-less-variables.svg?branch=master
[coverage-url]: https://coveralls.io/r/Brightspace/images-to-less-variables?branch=master
[coverage-image]: https://img.shields.io/coveralls/Brightspace/images-to-less-variables.svg
[dependencies-url]: https://david-dm.org/brightspace/images-to-less-variables
[dependencies-image]: https://img.shields.io/david/Brightspace/images-to-less-variables.svg
