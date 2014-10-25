;(function($) {

	var defaults = {
		cssClass: 'jqnotepad',
		rows: 10,
		cols: 30,
		css: {
			'line-height': '16px',
			'padding-left': '5px',
			'padding-top': 0,
			'max-width': '300px'
		}
	};
 
	function Notepad(holder, options) {
		
		this._config = $.extend({}, defaults, options);

		this._holder = holder;
		this._controls = { textarea: null };

		this._init();
	}
	
	Notepad.prototype = {
		
		_init: function() {

			var text = this._holder.text(); // cache text;

			this._holder.hide(); // special performance tricks: hide control before some changes

			this._initLayout();
			this._createControls();
			this._applyStyles();
			this._attachEvents();

			this._controls.textarea.val(text);	// restore text
			
			this._holder.show(); // show control after changes
		},

		_initLayout: function() {

			var html = '';
			var conf = this._config;
			html += '<textarea ';
			html += 'class="' + conf.cssClass + '" ';
			html += 'rows="' + this._config.rows + '" ';
			html += 'cols="' + this._config.cols;
			html += '">';

			this._holder.html(html);
		},

		_createControls: function() {

			this._controls.textarea = this._holder.find('textarea');
		},

		_applyStyles: function() {

			if (!this._config.css['background-image'])
				this._config.css['background-image'] = this._getSvgLines();

			this._injectStyle('.' + this._config.cssClass, this._config.css);
		},

		_injectStyle: function(selector, css) {

			var styleSheet = this._createStyleSheet();

			var cssString = this._cssToString(css);

			var rule = selector + ' { ' + cssString + ' }';
			return styleSheet.insertRule(rule, styleSheet.cssRules.length);
		},

		_cssToString: function(css) {

			var retval = "";

			for (key in css)
				if (css.hasOwnProperty(key))
					retval += key + ': ' + css[key] + '; ';

			return retval;
		},

		_createStyleSheet: function() {

			if (document.createStyleSheet)
				return document.createStyleSheet();

			var style = document.createElement('style');
			document.getElementsByTagName('head')[0].appendChild(style);
			return style.sheet;
		},

		_getSvgLines: function () {

			var html = "";
			var lh = defaults.css['line-height'].split('px')[0];
			html+= "<svg xmlns='http://www.w3.org/2000/svg' width='1' height='" + lh + "'>";
			html+= "<line x1='0' y1='" + lh + "' x2='1' y2='" + lh + "' stroke='black' stroke-width='1px'/>";
			html+= "</svg>";

			return 'url("data:image/svg+xml;utf8,' + html + '")';
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
