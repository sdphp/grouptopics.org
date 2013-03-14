gt.datatable = {
	initialize: function ( div, sel, options, filterConfig ) {
		if ( typeof sel == 'undefined' ) var sel = '.datatable';
		if ( typeof div == 'undefined' ) var div = 'body';

		var items = $( div ).find( 'table' + sel );
		var datatable_objs = [];
		if ( items.length < 1 ) return false;

		$.extend( $.fn.dataTableExt.oStdClasses, {
			"sSortAsc":  "header headerSortDown",
			"sSortDesc": "header headerSortUp",
			"sSortable": "header",
			"sWrapper":  "dataTables_wrapper form-inline"
		} );

		$( items ).each( function () {
			// These are the default configs. If you change them here, they will change everywhere
			var defaultConfig = {
				"bAutoWidth":      false,
				"bDestroy":        true,
				"sPaginationType": "bootstrap",
				"bStateSave":      true,
				"iDisplayLength":  10,
				"sDom":            "<'pull-left'l><'pull-right'f><'clearfix'>rt<'pull-left'i><'pull-right'p>",
			/**	"oTableTools":     {
					"sSwfPath": "/assets/css/images/copy_csv_xls_pdf.swf",
					"aButtons": [
						"copy", "csv", "xls", "pdf", "print"
					]
				},//*/
				"aLengthMenu":     [
					[1, 10, 15, 25, 50, -1],
					[1, 10, 15, 25, 50, "All"]
				]
			}

			if ( !options ) options = {};
			var config = $.extend( true, {}, defaultConfig, options );

			var table = $( this ).dataTable( config ),
				wrapper = table.closest( '.dataTables_wrapper' );

			if( typeof filterConfig == 'object' )
				table.columnFilter( filterConfig );

			gt.transform.select( wrapper.find( '.dataTables_length select' ) );
			datatable_objs.push( table );
		} );

		for( var dt in datatable_objs )
		{
			var table = datatable_objs[ dt ],
				nodes = table.fnGetNodes();
			for( var i = 0; i < nodes.length; i++ )
			{
				gt.transform.select( $( nodes[ i ] ).find( 'select' ), 'btn btn-mini btn-link' );
			}
		}
		gt.transform.select( 'select.search_init', 'btn btn-mini' );

		return datatable_objs;
	},
	update:     {
		cell: function ( table, cell ) {
			var dt = table.dataTable(),
				position = dt.fnGetPosition( cell[0] ),
				html = cell.html();
			dt.fnUpdate( html, position[0], position[1], true, true );
		}
	}
}