;(function($) {

	var defaults = {
		'lineheight': 16,
	  	rows: 10,
	  	cols: 30				
	};
 
	function Notepad(holder, options) {
		
		this.config = $.extend({}, defaults, options);
		this.holder = holder;
		this.init();
	}
	
	Notepad.prototype = {
		
		init: function() {

			this._initLayout();
			this._initStyles();
			this._attachEvents();
		},

		_initLayout: function() {

			var text = this.holder.text();
			this.holder.html('<textarea rows="' + this.config.rows + '" cols="' + this.config.cols + '">');
			this.textarea = this.holder.find('textarea');
			this.textarea.val(text);
		},

		_initStyles: function() {

			var svg = this._createSvgLines();			
			var bi = 'url("data:image/svg+xml;utf8,' + svg + '")';
			var lh = this.config.lineheight + 'px';

			this.textarea.css({ 'background-image': bi, 'line-height': lh });
		},

		_createSvgLines: function() {

			var html = "";
			html+= "<svg xmlns='http://www.w3.org/2000/svg' width='1' height='" + this.config.lineheight + "'>";
			html+= "<line x1='0' y1='" + this.config.lineheight + "' x2='1' y2='" + defaults.lineheight + "' stroke='black' stroke-width='1px'/>";
			html+= "</svg>";

			return html;
		},

		_attachEvents: function() {

			this.textarea.on('scroll', this._onScroll.bind(this));
		},

		_onScroll: function(ev) {

			var el = $(ev.target);
			var y = - el.scrollTop();
			this.textarea.css({'background-position': '0 ' + y + 'px' });
		}
	};
	
	$.fn.notepad = function(options) {

		new Notepad(this.first(), options);
		return this.first();
	};

}(jQuery));
