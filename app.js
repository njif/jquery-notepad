$(document).ready(function() {

	var css = { 
		'background-image': 'url("lines.jpg")',
		'background-repeat': 'no-repeat',
		'padding-left': '100px', 
		'padding-top': '70px', 
		'line-height': '24px',
		'max-width': '800px'
	};

	$('.notepad').notepad({ css: css });
});