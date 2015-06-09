'use strict';

var imagesToVariables = require('../lib/create'),
	path = require('path');

var dataPath = path.join(__dirname, 'data');

describe('createVariables', function() {

	var imagesPath = path.join(dataPath, 'icon.svg');

	var expectedUncompressedLength = 1293;
	var expectedUncompressedValue = 'url("data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3C!--%20Created%20with%20Inkscape%20(http%3A%2F%2Fwww.inkscape.org%2F)%20--%3E%0A%0A%3Csvg%0A%20%20%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%20%20%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%20%20%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%20%20%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20version%3D%221.1%22%0A%20%20%20width%3D%2220%22%0A%20%20%20height%3D%2220%22%0A%20%20%20id%3D%22svg2985%22%3E%0A%20%20%3Cmetadata%0A%20%20%20%20%20id%3D%22metadata2991%22%3E%0A%20%20%20%20%3Crdf%3ARDF%3E%0A%20%20%20%20%20%20%3Ccc%3AWork%0A%20%20%20%20%20%20%20%20%20rdf%3Aabout%3D%22%22%3E%0A%20%20%20%20%20%20%20%20%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%0A%20%20%20%20%20%20%20%20%3Cdc%3Atype%0A%20%20%20%20%20%20%20%20%20%20%20rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%20%2F%3E%0A%20%20%20%20%20%20%20%20%3Cdc%3Atitle%3E%3C%2Fdc%3Atitle%3E%0A%20%20%20%20%20%20%3C%2Fcc%3AWork%3E%0A%20%20%20%20%3C%2Frdf%3ARDF%3E%0A%20%20%3C%2Fmetadata%3E%0A%20%20%3Cdefs%0A%20%20%20%20%20id%3D%22defs2989%22%20%2F%3E%0A%20%20%3Cpath%0A%20%20%20%20%20d%3D%22m%20-14.596491%2C17.454546%20a%2016.178629%2C16.178629%200%201%201%20-32.357258%2C0%2016.178629%2C16.178629%200%201%201%2032.357258%2C0%20z%22%0A%20%20%20%20%20transform%3D%22matrix(0.61809151%2C0%2C0%2C0.61810639%2C29.021713%2C-0.78865248)%22%0A%20%20%20%20%20id%3D%22path2984%22%0A%20%20%20%20%20style%3D%22fill%3A%2349ab59%3Bfill-opacity%3A1%3Bfill-rule%3Aevenodd%3Bstroke%3Anone%22%20%2F%3E%0A%20%20%3Cpath%0A%20%20%20%20%20d%3D%22m%204.3056178%2C10.135058%203.776172%2C3.69456%207.6720882%2C-7.7850144%22%0A%20%20%20%20%20id%3D%22path2982%22%0A%20%20%20%20%20style%3D%22fill%3Anone%3Bstroke%3A%23ffffff%3Bstroke-width%3A1.86461604%3Bstroke-linecap%3Abutt%3Bstroke-linejoin%3Amiter%3Bstroke-miterlimit%3A4%3Bstroke-opacity%3A1%3Bstroke-dasharray%3Anone%22%20%2F%3E%0A%3C%2Fsvg%3E%0A")';
	var expectedCompressedLength = 253;
	var expectedCompressedValue = 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%3E%3Cpath%20d%3D%22M20%2010a10%2010%200%201%201-20%200%2010%2010%200%201%201%2020%200z%22%20fill%3D%22%2349ab59%22%20fill-rule%3D%22evenodd%22%2F%3E%3Cpath%20d%3D%22M4.306%2010.135l3.776%203.695%207.672-7.785%22%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%221.865%22%2F%3E%3C%2Fsvg%3E")';

	it('should create variable for uncompressed image', function(done) {

		imagesToVariables(imagesPath, { optimize: false }).then(function(variables) {
			expect(variables.length).not.toBe(0);
			expect(variables[0].name).toBe('icon');
			expect(variables[0].length).toBe(expectedUncompressedLength);
			expect(variables[0].value).toBe(expectedUncompressedValue);
			done();
		});

	});

	it('should create variable for compressed image', function(done) {

		imagesToVariables(imagesPath).then(function(variables) {
			expect(variables.length).not.toBe(0);
			expect(variables[0].name).toBe('icon');
			expect(variables[0].length).toBe(expectedCompressedLength);
			expect(variables[0].value).toBe(expectedCompressedValue);
			done();
		});

	});

});
