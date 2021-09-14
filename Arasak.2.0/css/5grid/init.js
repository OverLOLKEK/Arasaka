
/*********************/
/* Object Setup      */
/*********************/

	var _5gridC = function()
	{
		this.events = new Array();

		this.isReady = false;
		this.isMobile = false;
		this.isDesktop = false;
		this.isFluid = false;
		this.is1000px = false;
		this.is1200px = false;
	}

	_5gridC.prototype.bind = function(name, f)
	{
		if (!this.events[name])
			this.events[name] = new Array();
		
		this.events[name].push(f);
	}

	_5gridC.prototype.trigger = function(name)
	{
		if (!this.isReady || !this.events[name] || this.events[name].length < 1)
			return;
			
		for (i in this.events[name])
			(this.events[name][i])();
	}

	_5gridC.prototype.ready = function(f) { this.bind('ready', f); }
	_5gridC.prototype.orientationChange = function(f) { this.bind('orientationChange', f); }
	_5gridC.prototype.mobileUINavOpen = function(f) { this.bind('mobileUINavOpen', f); }
	_5gridC.prototype.mobileUINavClose = function(f) { this.bind('mobileUINavClose', f); }

	_5gridC.prototype.readyCheck = function()
	{
		var x = this;
		
		window.setTimeout(function() {
			if (x.isReady)
				x.trigger('ready');
			else
				x.readyCheck();
		}, 50);
	}

	var _5grid = new _5gridC;


(function() {

/*********************/
/* Initialize        */
/*********************/

	// Vars
		var	_baseURL, _opts,
			_fluid, _1000px, _1200px, _mobile, _desktop, _mobileOnly,
			_window = jQuery(window), _head = jQuery('head'), _document = jQuery(document),
			_headQueue = new Array(), _isLocked = false, _isTouch = !!('ontouchstart' in window), _eventType = (_isTouch ? 'touchend' : 'click'),
			v, w, x, y;

	// Shortcut methods
		_headQueue.pushI_5grid = function(s) { _headQueue.push('<style>' + s + '</style>'); };
		_headQueue.pushE_5grid = function(s) { _headQueue.push('<link rel="stylesheet" href="' + s + '" />'); };
		_headQueue.process_5grid = function() { _head.append(_headQueue.join('')); };
		jQuery.fn.disableSelection_5grid = function() { return jQuery(this).css('user-select', 'none').css('-khtml-user-select', 'none').css('-moz-user-select', 'none').css('-o-user-select', 'none').css('-webkit-user-select', 'none'); }
		jQuery.fn.enableSelection_5grid = function() { return jQuery(this).css('user-select', 'auto').css('-khtml-user-select', 'auto').css('-moz-user-select', 'auto').css('-o-user-select', 'auto').css('-webkit-user-select', 'auto'); }
		jQuery.fn.accelerate_5grid = function() { return jQuery(this).css('-webkit-transform', 'translateZ(0)').css('-webkit-backface-visibility', 'hidden').css('-webkit-perspective', '1000'); }

	// Determine base URL, opts
		x = jQuery('script').filter(function() { return this.src.match(/5grid\/init\.js/); }).first();
		y = x.attr('src').split('?');
		_baseURL = y[0].replace(/5grid\/init\.js/, '');
		_opts = new Array();

		// Default opts
			_opts['use'] = 'mobile,desktop';
			_opts['prefix'] = 'style';

	// Determine viewing modes
		_desktop = _mobile = _fluid = _1000px = _1200px = _mobileOnly = false;
		v = _opts['use'].split(',');
		if (jQuery.inArray('desktop', v) > -1)
			_desktop = true;






/*********************/
/* Core              */
/*********************/

	// Legacy IE fixes
		if (jQuery.browser.msie)
		{
			// HTML5 Shiv
				if (jQuery.browser.version < 9)
					_head.append('<script type="text/javascript" src="' + _baseURL + '5grid/html5shiv.js" />');

			// Versions that don't support CSS3 pseudo classes
				if (jQuery.browser.version < 8)
				{
					jQuery(function() {
						jQuery('.5grid, .5grid-layout, .do-5grid').after('<div style="clear: both;"></div>');
					});
				}
		}

	// Insert stylesheets
		_headQueue.pushE_5grid(_baseURL + '5grid/core.css')
		_headQueue.pushE_5grid(_baseURL + _opts['prefix'] + '.css');

/*********************/
/* Responsive        */
/*********************/

	(function() {
		var ww = _window.width(), sw = screen.width, orientation = window.orientation;
		if (screen.width > screen.height
		&&	Math.abs(orientation) == 90)
			sw = screen.height;
		else
		{
			if (_fluid)
			{
				_5grid.isFluid = true;
				_head.prepend('<meta name="viewport" content="width=1280" />');
				_headQueue.pushE_5grid(_baseURL + '5grid/core-desktop.css');
				_headQueue.pushE_5grid(_baseURL + '5grid/core-fluid.css');
				_headQueue.pushE_5grid(_baseURL + _opts['prefix'] + '-fluid.css');
			}
			// Desktop
			else if (_desktop)
			{
				_5grid.isDesktop = true;
				_headQueue.pushE_5grid(_baseURL + '5grid/core-desktop.css');
				_headQueue.pushE_5grid(_baseURL + _opts['prefix'] + '-desktop.css');

				// 1200px
				if (ww >= 1200)
				{
					_5grid.is1200px = true;
					_head.prepend('<meta name="viewport" content="width=1280" />');
					_headQueue.pushE_5grid(_baseURL + '5grid/core-1200px.css');

					// Load 1200px stylesheet if 1200px was explicitly enabled
					if (_1200px)
						_headQueue.pushE_5grid(_baseURL + _opts['prefix'] + '-1200px.css');
				}

			}

		}

		jQuery(function() { jQuery('.5grid-layout').addClass('5grid'); });
	})();
	_headQueue.process_5grid();
	_5grid.isReady = true;

	jQuery(function() { _5grid.readyCheck(); });

})();