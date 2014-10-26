jquery-notepad
==============

jquery notepad plugin

##Usage example

$(document).ready(function() {

	var css = { 
		'background-image': 'url("lines.jpg")',
		'background-repeat': 'no-repeat',
		'padding-left': '100px', 
		'padding-top': '70px', 
		'line-height': '24px',
		'max-width': '800px',
		'max-height': '695px'
	};

	$('.notepad').notepad({ cssClass: 'my_jqnotepad', css: css });
});
