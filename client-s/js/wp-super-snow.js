(function($)
	{
		'use strict'; // Strict standards.

		$.fn.wpSuperSnow = function(options) // Start snowing.
			{
				var i, left, visibility, duration, delay, size, wind, flake, $flake,
					$head = $('head'), $body = $('body'), $container, // Cache what we can.
					defaults = {flakes: [$.wpSuperSnowFlake], total: 75, size: 75, zindex: 9999999, speed: 25, trans: false},
					winds = ['wpSuperSnowL', 'wpSuperSnowR'];

				options = $.extend({}, defaults, options); // Extend default options.

				if($.wpSuperSnowCSS) // This property is emptied each time; e.g. we do this ONE-time-only.
					$head.append('<style type="text/css">' + $.wpSuperSnowCSS + '</style>'), $.wpSuperSnowCSS = '';

				var mtRand = function(min, max)
					{
						min = (typeof min === 'number') ? min : 0;
						max = (typeof max === 'number') ? max : Number.MAX_VALUE;
						return Math.floor(Math.random() * (max - min + 1)) + min;
					};
				return this.each // A jQuery object array; we iterate all items.
				(function() // Each of these are containers sharing the same `options`.
				 {
					 for($container = $(this), i = 1; i <= Number(options.total); i++)
						 {
							 left = mtRand(0, 100);
							 visibility = mtRand(1, 9);
							 duration = mtRand(1, 10) + Number(options.speed);
							 delay = mtRand(1, duration);
							 size = mtRand(1, Number(options.size));
							 wind = winds[mtRand(0, winds.length - 1)];
							 flake = options.flakes[mtRand(0, options.flakes.length - 1)];
							 $flake = $('<div class="wp-super-snow-flake"><img src="' + flake + '" /></div>');

							 $flake.css // Let it snow...
							 ({'width': size + 'px', 'height': size + 'px',

								  'position': 'fixed',
								  'z-index' : Number(options.zindex),
								  'left'    : left + '%', 'top': '0',
								  'opacity' : '0',

								  'animation'        : wind + ' ' + duration + 's infinite', 'animation-delay': delay + 's',
								  '-webkit-animation': wind + ' ' + duration + 's infinite', '-webkit-animation-delay': delay + 's',
								  '-moz-animation'   : wind + ' ' + duration + 's infinite', '-moz-animation-delay': delay + 's'
							  }),
								 $('img', $flake).css({width    : '100%', height: 'auto', border: 0,
									                      opacity: (options.trans) ? '.' + visibility : 1});

							 $container.append($flake);
						 }
				 });
			};
		$.wpSuperSnowFlake = 'data:image/png;base64,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';

		$.wpSuperSnowCSS = '@keyframes wpSuperSnowL {0% {opacity:0;} 50% {opacity:1;} 100% {opacity:0; transform:translate3D(100px,1500px,0) rotate(250deg);}}';
		$.wpSuperSnowCSS += '@keyframes wpSuperSnowR {0% {opacity:0;} 50% {opacity:1;} 100% {opacity:0; transform:translate3D(-100px,1500px,0) rotate(-500deg);}}';

		$.wpSuperSnowCSS += '@-webkit-keyframes wpSuperSnowL {0% {opacity:0;} 50% {opacity:1;} 100% {opacity:0; -webkit-transform:translate3D(100px,1500px,0) rotate(250deg);}}';
		$.wpSuperSnowCSS += '@-webkit-keyframes wpSuperSnowR {0% {opacity:0;} 50% {opacity:1;} 100% {opacity:0; -webkit-transform:translate3D(-100px,1500px,0) rotate(-500deg);}}';

		$.wpSuperSnowCSS += '@-moz-keyframes wpSuperSnowL {0% {opacity:0;} 50% {opacity:1;} 100% {opacity:0; -moz-transform:translate3D(100px,1500px,0) rotate(250deg);}}';
		$.wpSuperSnowCSS += '@-moz-keyframes wpSuperSnowR {0% {opacity:0;} 50% {opacity:1;} 100% {opacity:0; -moz-transform:translate3D(-100px,1500px,0) rotate(-500deg);}}';
	})(jQuery);