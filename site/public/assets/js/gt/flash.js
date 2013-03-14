gt.flash = {
	hide: function( ) {
		var par = $( this ).parent( 'div.user-flash' );
		var id = par.attr( 'rel' );
		par.fadeOut( 'fast', function() {
			$( this ).remove();
		});

		$.post( '/flash/hide/' + id );
		if( gt.flash.hasNextFlash() )
			gt.flash.showNextFlash();
	},
	hasNextFlash: function() {
		var visibleFlashes = $( 'div#user-flashes > div.user-flash:visible' );
		if( visibleFlashes.length > 0 )
		{
			return true;
		}
		return false;
	},
	showNextFlash: function() {
		$( 'div#user-flashes > div.user-flash:visible' ).eq( 0 ).fadeIn( );
	}
}
