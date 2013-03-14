gt.history = {
	initialize: function( ) {
		// Prepare
		var History = window.History; // Note: We are using a capital H instead of a lower h
		if ( !History.enabled ) {
			// History.js is disabled for this browser.
			// This is because we can optionally choose to support HTML4 browsers or not.
			return false;
		}

		// Bind to StateChange Event
		History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
			var State = History.getState(); // Note: We are using History.getState() instead of event.state
			var body = $( gt.config.history.selectors.body ),
				content = body.find( gt.config.history.selectors.content ),
				gthis = new gt.historyObject( State, body, content, 400 );
			gthis.run();
		});

		var temp = gt.history;
		gt.history = History;
		$.extend( true, gt.history, temp );
	}
};

gt.historyObject = (function( ) {
	var cls = function( state, body, content, animateSpeed ) {
		var state = state,
			body = body,
			content = content,
			animateSpeed = animateSpeed,
			instance = this;

		this.getState = function() { return state; };
		this.getBody = function() { return body; };
		this.getContent = function() { return content; };
		this.getAnimateSpeed = function() { return animateSpeed; };
		this.getInstance = function() { return instance; };
		
		return this;
	};
	cls.prototype = {
		run: function() {
			var cls = this.getInstance(),
				speed = this.getAnimateSpeed(),
				content = this.getContent(),
				body = this.getBody();
			
			body.toggleClass( 'loading' );
			return content.animate( { opacity: 0 }, speed, function() {
				cls.replaceContent( cls );
			} );
		},
		showDisplay: function( cls ) {
			var speed = this.getAnimateSpeed(),
				content = this.getContent(),
				body = this.getBody();

			content.animate( { opacity: 1 }, speed );
			body.toggleClass( 'loading' );
		},
		replaceContent: function( cls ) {
			var state = this.getState(),
				body = this.getBody(),
				content = this.getContent(),
				animateSpeed = this.getAnimateSpeed();

			$.ajax( {
				url: state.url,
				method: 'get',
				success: function( data, textStatus, jqXHR ) {
					var url = state.url.replace( window.location.origin, '' );

					if( typeof data.javascript !== "undefined" ) {
				    	console.log( 'evaling' + data.javascript );
					    eval( data.javascript );
					} else {
				    	content.html( data );
					}

					cls.showDisplay( cls );

				},
				error: function() {
					$( 'body div.navbar.navbar-fixed-top li a' ).each( function() {
						var href = $( this ).attr( 'href' ) || $( this ).data( 'href' ) || "#";
						if( href == state.data.location.pathname ) {
							$( this ).parent( 'li' ).addClass( 'active' );
						} else {
							$( this ).parent( 'li' ).removeClass( 'active' );
						}
					} );
					history.back();

				}
			} );
		}
	}
	return cls;
})();
