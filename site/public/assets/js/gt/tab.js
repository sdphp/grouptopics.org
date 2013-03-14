gt.tab = {
	initialize:function () {
		$( '.ue-tab-content .tab-pane:not(.active)' ).hide();
	},
	show:      function ( e ) {
		e.preventDefault();

		console.log( 'still using tabs. If you see this, tell aaron where.' );

		var a = $( this ),
			par = a.closest( '[data-tabs]' ),
			sel = par.data( 'tabs' );

		$( sel ).slideUp( 400, function() {
			$( sel ).find( '.tab-pane' ).hide();
			$( sel ).find( a.attr( 'href' ) ).show();
			$( sel ).slideDown( 400 );
		} );

		return false;
	}
};
