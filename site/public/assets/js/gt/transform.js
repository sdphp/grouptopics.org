gt.transform = {
	select:   function ( selector, cls ) {
		var inputs = $( selector );
		if ( !cls ) {
			cls = 'btn';
		}

		inputs.each( function () {
			var selected = $( this ).find( 'option:selected' ).text().split( '_' )[0],
				icon = $( this ).find( 'option:selected' ).data( 'icon-class' ),
				options = $( this ).find( 'option' ),
				span = $( '<span/>' ).addClass( 'caret' ),
				button = $( '<a/>' ).addClass( cls )
					.addClass( 'dropdown-toggle' )
					.attr( 'data-toggle', 'dropdown' )
					.text( selected );
			if ( icon ) {
				button.prepend( '<i class="' + icon + '"></i> ' );
			}
			var dropdown = $( '<ul/>' ).addClass( 'dropdown-menu' );
			options.each( function () {
				var icon = $( this ).data( 'icon-class' ),
					validate = $( this ).data( 'validate' ),
					link = $( '<a/>' ).addClass( 'select-replace-option' )
						.attr( 'data-value', $( this ).val() )
						.text( $( this ).text().split( '_' )[0] );
				if ( icon ) link.prepend( '<i class="' + icon + '"></i>' ).attr( 'data-icon-class', icon );
				if ( validate ) link.attr( 'data-validate', validate );
				var li = $( '<li/>' ).append( link );
				if ( $( this ).is( ':selected' ) ) li.addClass( 'active' );
				dropdown.append( li );
			} );
			var html = $( '<div/>' ).addClass( 'btn-group' )
				.addClass( 'select-replace' )
				.prepend( button )
				.append( dropdown );
			html = gt.copyAttributes( this, html ).tooltip();
			$( html ).insertBefore( $( this ) );
			$( this ).hide();
		} );
	},
	form:     {
		fieldset:             function ( selector, cls ) {
			var forms = $( selector );
			if ( !cls ) {
				cls = 'fieldset';
			}

			forms.each( function () {
				var form = $( this ),
					container = form.find( 'div#generic' ),
					fieldsets = container.children( 'div' );

				fieldsets.css( { opacity: 0 } ).hide();

				fieldsets.eq( fieldsets.length - 1 ).data( 'last', true );

				fieldsets.each( function ( index ) {
					var legend = $( '<legend></legend>' ).html( $( this ).children( 'label' ).eq( 0 ).html() );

					// Changing Inner Div
					$( this ).children( 'div' ).removeAttr( 'id' ).addClass( 'fields' );
					gt.transform.form.insertAndRemove( legend, $( this ).children( 'label' ).eq( 0 ) );


					var stepDiv = $( '<div></div>' ).addClass( 'stepDiv form-actions' ).appendTo( this );
					var previousStep = $( '<a>Previous</a>' ).addClass( 'btn btn-primary previousStep' )
						.css( { 'margin-right': '7px' })
						.appendTo( stepDiv );
					var nextStep = $( '<a>Next</a>' ).addClass( 'btn btn-primary nextStep' )
						.css( { 'margin-right': '7px' })
						.appendTo( stepDiv );
					var submit   = $( "<button type='submit'>Create Order</button>" ).addClass( 'submit btn btn-inverse' )
						.css( { 'margin-right': '7px' });

					// Add "Previous Step" Button
					if ( !index ) {
						$( this ).find( 'a.previousStep' ).remove();
					}
					// Add "Next Step" Button
					if ( index === fieldsets.length - 1 ) {
						$( this ).find( 'a.nextStep' ).remove();
						submit.appendTo( stepDiv );
					}


					var fieldset = $( '<fieldset></fieldset>' ).html( $( this ).html() )
						.attr( 'id', 'step_' + ( index + 1 ) )
						.css( { opacity: 0 } )
						.hide();
					gt.transform.form.insertAndRemove( fieldset, this );

					$( fieldset ).on( 'click', 'a.nextStep', gt.transform.form.showNextFieldset );
					$( fieldset ).on( 'click', 'a.previousStep', gt.transform.form.showPreviousFieldset );
				} );

				$( container ).children( 'fieldset' ).eq( 0 ).css( { opacity: 1 } ).show();
				if( typeof gt.transform.events.fieldset.step_1 === 'function' )
				{
					gt.transform.events.fieldset.step_1();
				}
			} );
		},
		insertAndRemove:      function ( insert, remove ) {
			$( insert ).insertBefore( $( remove ) );
			$( remove ).remove();
		},
		showNextFieldset:     function () {
			var fieldset = $( this ).closest( 'fieldset' ),
				nextFieldset = fieldset.next( 'fieldset' );

			var valid;

			if ( gt.form.validate.submitForm( fieldset ) ) {
				fieldset.animate( { opacity: 0 }, 400, function () {
					$( this ).hide();
					nextFieldset.show().animate( { opacity: 1 }, 400, function() {
						if( typeof gt.transform.events.fieldset[ nextFieldset.attr( 'id' ) ] === 'function' )
						{
							gt.transform.events.fieldset[ nextFieldset.attr( 'id' ) ]();
						}
					} );
				} );
			}

		},
		showPreviousFieldset: function () {
			var fieldset = $( this ).closest( 'fieldset' ),
				previousFieldset = fieldset.prev( 'fieldset' );

			fieldset.animate( { opacity: 0 }, 400, function () {
				$( this ).hide();
				previousFieldset.show().animate( { opacity: 1 }, 400 );
			} );

		}
	},
	validate: {
		select: function () {
			if ( $( this ).parent( 'li' ).hasClass( 'active' ) ) {
				$( this ).closest( '.select-replace' ).removeClass( 'open' );
				return false;
			}
			var validate = $( this ).data( 'validate' ) || false;
			if ( validate === 'orderStatus' ) {
				gt.transform.update.orderStatus( $( this ) );
			}
			else if ( validate === false ) {
				gt.transform.update.transformedSelect( $( this ) );
			}
		}
	},
	update:   {
		transformedSelect: function ( field ) {
			var clickedValue = field.attr( 'data-value' );
			var clickedText = field.text();
			var icon = field.data( 'icon-class' );
			field.closest( 'div.btn-group, div.select_filter' ).next( 'select' ).val( clickedValue ).change();
			field.parent( 'li' ).addClass( 'active' ).siblings().removeClass( 'active' );
			var updatedButton = field.closest( 'div.btn-group, div.select_filter' ).find( '.dropdown-toggle' ).text( clickedText );
			if ( icon ) {
				updatedButton.prepend( '<i class="' + icon + '"></i> ' );
			}
		},
		orderStatus:       function ( option ) {
			var cid = option.closest( 'div.btn-group' ).data( 'campaign-id' ),
				nstatus = option.data( 'value' ),
				sortVal = ( nstatus == 'active' ) ? 'Active_sort' : 'Paused_sort';
			$( '#campaignTable_wrapper > .dataTableLoading > .ajaxLoading' ).fadeIn();
			$.post( '/campaign/status/' + cid + '/', {'status': nstatus}, function ( data ) {
				if ( data.data == 'ok' ) {
					gt.transform.update.transformedSelect( option );
					option.closest( 'div.btn-group' ).siblings( 'span.hidden' ).html( sortVal );
					gt.datatable.update.cell( $( '#campaignTable' ), option.closest( 'td' ) );
				}
				else if ( typeof data.error != 'undefined' ) {
					gt.notice( { title: '<i class="icon-warning-sign"></i> Error!', text: data.error } );
				}
				$( '#campaignTable_wrapper > .dataTableLoading > .ajaxLoading' ).fadeOut();
			} );
		}
	},
	events: {
		fieldset: {}
	}
};