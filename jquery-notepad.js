;(function($) {

	var defaults = {
		rows: 10,
		cols: 30,
		css: {
			'line-height': '16px',
			'padding-left': '5px',
			'padding-top': 0,
			'max-width': '300px'
		}
	};

	function getSvgLines() {

		var html = "";
		var lh = defaults.css['line-height'].split('px')[0];
		html+= "<svg xmlns='http://www.w3.org/2000/svg' width='1' height='" + lh + "'>";
		html+= "<line x1='0' y1='" + lh + "' x2='1' y2='" + lh + "' stroke='black' stroke-width='1px'/>";
		html+= "</svg>";

		return 'url("data:image/svg+xml;utf8,' + html + '")';
	}
 
	function Notepad(holder, options) {
		
		this._config = $.extend({}, defaults, options);

		this._holder = holder;
		this._controls = { textarea: null };

		this._init();
	}
	
	Notepad.prototype = {
		
		_init: function() {

			var text = this._holder.hide().text(); // cache text;

			this._initLayout();
			this._createControls();
			this._applyStyles();
			this._attachEvents();

			this._controls.textarea.val(text);	// restore text
			this._holder.show();
		},

		_initLayout: function() {

			var html = '';
			html += '<textarea rows="';
			html += this._config.rows;
			html += '" cols="';
			html += this._config.cols;
			html += '">';

			this._holder.html(html);
		},

		_createControls: function() {

			this._controls.textarea = this._holder.find('textarea');
		},

		_applyStyles: function() {

			if (!this._config.css['background-image'])
				this._config.css['background-image'] = getSvgLines();

			this._controls.textarea.css(this._config.css);
		},

		_attachEvents: function() {

			this._controls.textarea.on('scroll', this._onScroll.bind(this));
		},

		_onScroll: function(ev) {

			var el = $(ev.target || ev.srcElement);
			var y = - el.scrollTop();
			this._controls.textarea.css({ 'background-position': '0 ' + y + 'px' });
		}
	};
	
	$.fn.notepad = function(options) {

		new Notepad(this.first(), options);
		return this.first();
	};

}(jQuery));
