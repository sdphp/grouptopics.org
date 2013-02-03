gt.eventBinds.main = {
	bindCollection:   [
		{
			bParent:   document,
			bSelector: 'div.user-flash div.flash-hide',
			bType:     'click',
			bFunction: gt.flash.hide
		},
		{
			bParent:   document,
			bSelector: '#toggle_cbx',
			bType:     'click',
			bFunction: function () {
				if ( $( this ).is( ':checked' ) ) {
					$( '.placement_cbx' ).attr( 'checked', true );
				} else {
					$( '.placement_cbx' ).attr( 'checked', false );
				}
			}
		},
		{
			bParent:   document,
			bSelector: '.navbar.navbar-fixed-top li:not(.noAjax)',
			bType:     'click',
			bFunction: function( e ) {
				var a  = $( this ).children( 'a' ),
					ul = $( this ).closest( 'ul' ),
					li = $( this ),
					href = a.attr( 'href' ) || a.data( 'href' ) || "#";


				if( a.attr( 'href' ) )
				{
					a.data( 'href', href );
					a.removeAttr( 'href' );
				}

				if( href.indexOf( '#' ) == -1 )
				{
					if( ul.hasClass( 'dropdown-menu' ) )
					{
						li = ul.closest( 'li.dropdown' );
						ul = li.closest( 'ul' );
					}

					$( '.navbar-fixed-top ul' ).find( 'li' ).removeClass( 'active' );
					li.addClass( 'active' );

					gt.history.pushState( { state: a.text(), location: window.location }, null, href );
					return;
				}
			}
		},
		{
			bParent:   document,
			bSelector: 'a.clean',
			bType:     'click',
			bFunction: function( e ) {
				var a  = $( this ),
					href = a.attr( 'href' ) || a.data( 'href' ) || "#";

				if( a.attr( 'href' ) )
				{
					a.data( 'href', href );
					a.removeAttr( 'href' );
				}

				if( href != '#' )
				{
					gt.history.pushState( { state: a.text(), location: window.location }, null, href );
				}
			}
		},
		{
			bParent:   document,
			bSelector: '.sf-toolbar a',
			bType:     'click',
			bFunction: function( e ) {
				window.open( $( this ).attr( 'href' ) );
				e.preventDefault();
				return false;
			}
		}


	],
	onLoadCollection: function () {
		$.ajaxSetup( {
			cache: false
		} );

		$( document ).ajaxSend( function( event, xhr, options ) {
			console.log( "Loading: " + options.url );
		});

		$( document ).unbind( 'ajaxError' );
		$( document ).ajaxError( function ( e, xhr, settings, exception ) {
			if ( exception != 'abort' && exception != '' ) {
				var xhr_json = false;
				if ( typeof xhr.responseText != 'undefined' ) {
					try {
						xhr_json = $.parseJSON( xhr.responseText );
					}
					catch ( e ) {
						xhr_json = false;
					}
				}

				if ( typeof xhr_json == 'object' && typeof xhr_json.title == 'string' && typeof xhr_json.text == 'string' )
					gt.notice( xhr_json );
				else
					gt.notice( { title: 'Error!', text: 'There was an error processing your request. Please try again.' } );
			}
		} );
		$( document ).ajaxSuccess( gt.postAjaxLoad );
		$( '[rel=tooltip]' ).tooltip();
		$( '[rel=delayedTooltip]' ).tooltip( {
			delay: {
				show: 500,
				hide: 0
			}
		} );
		$( '[rel=popover]' ).popover( {
			trigger:   'hover',
			placement: 'top',
			html:      true
		} );
		$( '[rel=delayedPopover]' ).popover( {
			trigger:   'hover',
			placement: 'top',
			html:      true,
			delay:     {
				show: 500,
				hide: 0
			}
		} );
	}
};
