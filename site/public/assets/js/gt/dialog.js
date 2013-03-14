gt.dialog = {
	initialize:    function ( sel ) {
		if ( sel === undefined ) {
			sel = 'body';
		}

		var items = $( sel ).find( 'div.dialog' );

		if ( items.length < 1 ) {
			return false;
		}

		$( items ).each( function () {
			var ele = $( this ),
				modal = ele.data( 'modal' ) === undefined ? false : true,
				close = {
					'class': 'btn dialog-close',
					'text':  ele.data( 'button-close-text' ) !== undefined ? ele.data( 'button-close-text' ) : 'Close',
					'click': ele.data( 'button-close-javascript' ) !== undefined ?
						function () {
							eval( ele.data( 'button-close-javascript' ) );
						}
						:
						function () {
							$( this ).dialog( 'close' );
						}
				},
				submit = {
					'class': 'btn btn-primary dialog-submit',
					'text':  ele.data( 'button-submit-text' ) !== undefined ? ele.data( 'button-submit-text' ) : 'Submit',
					'click': ele.data( 'button-submit-javascript' ) !== undefined ?
						function () {
							eval( ele.data( 'button-submit-javascript' ) );
						}
						:
						function () {
							$( this ).find( 'form' ).submit();
						}
				},
				buttons = [];
			if ( ele.data( 'no-submit' ) === undefined ) {
				buttons.push( submit );
			}
			if ( ele.data( 'no-close' ) === undefined ) {
				buttons.push( close );
			}

			var dialog_width = 'auto';
			var dialog_height = 'auto';

			if ( $( ele ).hasClass( 'width-tiny' ) ) {
				dialog_width = 200;
			}
			else if ( $( ele ).hasClass( 'width-small' ) ) {
				dialog_width = 300;
			}
			else if ( $( ele ).hasClass( 'width-medium' ) ) {
				dialog_width = 600;
			}
			else if ( $( ele ).hasClass( 'width-large' ) ) {
				dialog_width = 800;
			}
			else if ( $( ele ).hasClass( 'width-extra-large' ) ) {
				dialog_width = 1200;
			}

			if ( $( ele ).hasClass( 'height-tiny' ) ) {
				dialog_height = 200;
			}
			else if ( $( ele ).hasClass( 'height-small' ) ) {
				dialog_height = 400;
			}
			else if ( $( ele ).hasClass( 'height-medium' ) ) {
				dialog_height = 600;
			}
			else if ( $( ele ).hasClass( 'height-large' ) ) {
				dialog_height = 800;
			}
			else if ( $( ele ).hasClass( 'height-extra-large' ) ) {
				dialog_height = 1000;
			}

			var config = {
				autoOpen:    false,
				draggable:   false,
				resizable:   false,
				modal:       modal,
				title:       ele.data( 'title' ),
				dialogClass: ele.data( 'class' ),
				buttons:     buttons,
				position:    [ 'top', 80 ],
				width:       dialog_width,
				height:      dialog_height,
				open:        function ( event, ui ) {
					var options = $( this ).dialog( "option" ),
						id   = $( this ).attr( 'id' ),
						link = options.link;

					if ( link.attr( 'href' ) !== undefined ) {
						var container = $( this ).parent();
						container.prepend( '<div class="ajaxLoading"><div class="spinner"></div></div>' )
							.find( '.ajaxLoading' ).show();
						$( this ).html( '' ).load( link.attr( 'href' ), function () {
							if ( ele.data( 'open' ) !== undefined ) {
								eval( ele.data( 'open' ) );
							}
							gt.dialog.initialize( '#' + id );
							container.find( '.ajaxLoading' ).fadeOut();
						} );
					}
					else {
						if ( ele.data( 'open' ) !== undefined ) {
							eval( ele.data( 'open' ) );
						}
					}
				},
				close:       function ( event, ui ) {
					var container = $( this ).parent();
					container.find( '.ajaxLoading' ).remove();
					document.onmousedown = null;
					document.onselectstart = null;
				},
				show:        { effect: 'scale', easing: 'easeOutQuart' }
			};
			$( this ).dialog( config );
		} );
	},
	replace:       function ( e ) {
		var sel = $( $( this ).data( 'target' ) ),
			body = sel.find( '.modal-body' ),
			url = $( this ).attr( 'href' ),
			old = body.data( 'old' );

		e.preventDefault();

		old = body.data( 'old' );
		if ( old === undefined ) {
			old = [];
		}
		old.push( body );
		body.data( 'old', old );

		var classSwap = $( this ).data( 'class-swap' );
		if ( classSwap !== undefined ) {
			var swap = classSwap.split( ',' ),
				from = gt.trim( swap[ 0 ] ),
				to = gt.trim( swap[ 1 ] );
			if ( sel.hasClass( from ) ) {
				sel.data( 'old-class', from );
				sel.switchClass( from, to, 600 );
			}

		}

		body.html( gt.html.loading );

		body.load( url, function() { return false; } );
	},
	open:          function () {
		var link = $( this ),
			target = link.data( 'target' );

		$( target ).dialog( "option", "link", link );
		$( target ).dialog( "open" );
		return false;
	}
};