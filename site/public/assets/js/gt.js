var gt = {
	runBinds:        function () {
		for ( var type in this.eventBinds ) {
			var binds = this.eventBinds[ type ]
			for ( var i in binds.bindCollection ) {
				var binding = binds.bindCollection[i];
				if ( typeof binding.bCondition != 'undefined' ) {
					if ( !eval( binding.bCondition ) )
						continue;
				}
				$( binding.bParent ).on( binding.bType, binding.bSelector, binding.bFunction );
			}
			binds.onLoadCollection();
		}
	},
	html:            {
		loading:     '<div class="loader"><span></span><span></span><span></span></div>',
		browser:     {
			alert: "<div class='browserAlert alert alert-error'><p>This site has been optimized for Google Chrome. Check it out here!</p></div>"
		},
		closeButton: '<button type="button" class="close" data-dismiss="alert">×</button>'
	},
	ucwords:         function ( str ) {
		return (str + "").replace( /^([a-z])|\s+([a-z])/g, function ( $1 ) {
			return $1.toUpperCase();
		} );
	},
	strtolower:      function ( str ) {
		return (str + '').toLowerCase();
	},
	trim:            function ( str ) {
		str = str.replace( /^\s+/, '' );
		for ( var i = str.length - 1; i >= 0; i-- ) {
			if ( /\S/.test( str.charAt( i ) ) ) {
				str = str.substring( 0, i + 1 );
				break;
			}
		}
		return str;
	},
	notice:          function ( options ) {
		var options = $.extend( { title: 'Notice', text: '', sticky: false, time: 5000, image: false }, options );
		$.extend( $.gritter.options, {
			position:       'top-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
			fade_in_speed:  'fast', // how fast notifications fade in (string or int)
			fade_out_speed: 'slow', // how fast the notices fade out
			time:           2000 // hang on the screen for...
		} );

		if ( $( '.gritter-item-wrapper' ).length >= 3 ) {
			setTimeout( function () {
				gt.notice( options );
			}, 1000 );
		}
		else {
			$.gritter.add( options );
		}
	},
	debug:           function ( msg ) {
		if ( typeof console != 'undefined' ) {
			console.log( msg );
		}
	},
	reloadExternals: function () {
		var queryString = '?reload=' + new Date().getTime();
		$( 'link[rel="stylesheet"][href^="/"]' ).each( function () {
			$( this ).attr( 'href', $( this ).attr( 'href' ) + queryString );
		} );
		$( 'script[src^="/"]' ).each( function () {
			$( this ).attr( 'src', $( this ).attr( 'src' ) + queryString );
		} );
	},
	handleError:     function () {
		for ( var i in gt.handleError.arguments ) {
			var arg = gt.handleError.arguments[ i ];
			console.log( arg );
		}
	},
	copyAttributes:  function ( from, to ) {

		from = $( from );
		to = $( to );

		var attribs = from.prop( 'attributes' );

		$.each( attribs, function () {
			var current = to.attr( this.name ),
				value = current + ( current === "" ? '' : ' ' ) + this.value;
			to.attr( this.name, value );
		} );
		return to;
	},
	createCookie:    function ( name, value, days ) {
		var expires;
		if ( days ) {
			var date = new Date();
			date.setTime( date.getTime() + (days * 24 * 60 * 60 * 1000) );
			expires = "; expires=" + date.toGMTString();
		}
		else {
			expires = "";
		}
		document.cookie = name + "=" + value + expires + "; path=/";

	},
	readCookie:      function ( name ) {
		var nameEQ = name + "=";
		var ca = document.cookie.split( ';' );
		for ( var i = 0; i < ca.length; i++ ) {
			var c = ca[i];
			while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1, c.length );
			if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
		}
		return null;
	},
	eraseCookie:     function ( name ) {
		this.createCookie( name, "", -1 );
	},
	microtime:       function ( get_as_float ) {
		var now = new Date().getTime() / 1000;
		var s = parseInt( now, 10 );
		return (get_as_float) ? now : (Math.round( (now - s) * 1000 ) / 1000) + ' ' + s;
	}
};
