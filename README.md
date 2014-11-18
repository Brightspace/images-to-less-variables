# images-to-less-variables
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Coverage Status][coverage-image]][coverage-url]

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

**Note:** Currently, the images must be uniquely named.  The module currently does not handle duplicate file names spreadh across directories, but this could be added.


[npm-url]: https://www.npmjs.org/package/images-to-less-variables
[npm-image]: https://badge.fury.io/js/images-to-less-variables.png
[ci-image]: https://travis-ci.org/Brightspace/images-to-less-variables.svg?branch=master
[ci-url]: https://travis-ci.org/Brightspace/images-to-less-variables
[coverage-image]: https://coveralls.io/repos/Brightspace/images-to-less-variables/badge.png?branch=master
[coverage-url]: https://coveralls.io/r/Brightspace/images-to-less-variables?branch=master
