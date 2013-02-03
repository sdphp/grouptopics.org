gt.eventBinds.dialog = {
	bindCollection:  [,
		{
			bParent: document,
			bSelector: '*[data-toggle=dialog][data-target].image-upload',
			bType: 'click',
			bFunction: function() {
				var id = $( this ).closest( 'tr[data-content-row-id]' ).data( 'content-row-id' ),
					target = $( $( this ).data( 'target' ) );
				target.data( 'content_id', id );
			}
		},
		{
			bParent: document,
			bSelector: '*[data-toggle=dialog][data-target].image-browser',
			bType: 'click',
			bFunction: function() {
				var id = $( this ).closest( 'div.image_set' ).find( 'input' ).attr( 'id' ),
					target = $( $( this ).data( 'target' ) );
				target.data( 'item_id', id );
			}
		},
		{
			bParent: document,
			bSelector: '*[data-toggle=dialog][data-target]',
			bType: 'click',
			bFunction: gt.dialog.open
		}
	],
	onLoadCollection:function () {
		gt.dialog.initialize();
	}
};
