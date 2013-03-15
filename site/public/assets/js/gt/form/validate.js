gt.form.validate = {
	error:         { field: undefined, message: undefined },
	submitForm:    function ( form ) {
		var inputs = $( form ).find( ':input' );
		var isValid = true;
		inputs.each( function () {

			gt.form.validate.removeError( form, this );

			gt.form.validate.doVal( form, this );

			var isFieldValid = gt.form.validate.error.message === '';

			if ( !isFieldValid ) {
				isValid = false;
				console.log( gt.form.validate.error );
				gt.form.validate.showError( form );
			}
		} );
		return isValid;
	},
	groups:        {
		alpha:        {
			preCheck: function ( form, field ) {
				return gt.form.validate.groups.helper.checkValidType( field, 'alpha' );
			},
			check:    function ( form, field, value ) {
				return ( /[^A-Za-z ]/.test( value ) );
			},
			message:  'This string must only contain letters.'
		},
		alphanum:     {
			preCheck: function ( form, field ) {
				return gt.form.validate.groups.helper.checkValidType( field, 'alphanum' );
			},
			check:    function ( form, field, value ) {
				return ( /[^A-Za-z0-9 ]/.test( value ) );
			},
			message:  'This string must only contain alphanumeric characters.'
		},
		zip:          {
			// Zip Code Validation
			preCheck: function ( form, field ) {
				return  gt.form.validate.groups.helper.checkValidType( field, 'zip' );
			},
			check:    function ( form, field, value ) {
				return valgt.length !== 5;
			},
			message:  'This is not a valid zip code.'
		},
		phone:        {
			// Phone Number Checks
			preCheck: function ( form, field ) {
				return  gt.form.validate.groups.helper.checkValidType( field, 'phone' );
			},
			check:    function ( form, field, value ) {
				return valgt.length !== 10;
			},
			message:  'This is not a valid phone number.'
		},
		emailList:    {
			preCheck: function ( form, field ) {
				return gt.form.validate.groups.helper.checkValidType( field, 'email-list' );
			},
			check:    function ( form, field, value ) {
				if( this.oldMessage !== undefined ) {
					this.message = this.oldMessage;
					this.oldMessage = undefined;
				}
				value = valgt.replace( / /g, '' ).replace( /,$/g, '' );
				var emails = valgt.split( ',' ),
					max = $( field ).data( 'valid-email-count' ) || 10,
					email = null;
				if( emails.length > max ) {
					return true;
				}
				var i = 0;
				for( i in emails ) {
					if( emails[ i ].indexOf( '@' ) === -1 || emails[ i ].indexOf( '.' ) === -1 ) {
						this.oldMessage = this.message;
						this.message = "One of the emails are invalid. Please correct it and try again.";
						return true;
					}
				}
				return false;
			},
			message:  'You have specified too many email addresses.'
		},
		dualPassword: {
			// Dual Password Checks
			preCheck: function ( form, field ) {
				return $( field ).is( 'input' ) && $( field ).attr( 'type' ) === 'password' && $( field ).is( '[id$="_second"]' );
			},
			check:    function ( form, field, value ) {
				var first = $( form ).find( ':input[type="password"][id$="_first"]' );
				var second = $( form ).find( ':input[type="password"][id$="_second"]' );
				gt.form.validate.removeError( form, first );
				gt.form.validate.error = { field: second, message: 'Your passwords do not match.' };
				return false;
			}
		},
		required:     {
			// Required Checks
			preCheck: function ( form, field ) {
				return $( field ).attr( 'required' ) !== undefined;
			},
			check:    function ( form, field, value ) {
				return gt.form.validate.groups.helper.isEmpty( form, field, value );
			},
			message:  function ( form, field ) {
				return $( field ).data( 'title' ) || 'This field is required!';
			}
		},
		minLength:    {
			// Min Length Checks
			preCheck: function ( form, field ) {
				return $( field ).attr( 'minlength' ) !== undefined;
			},
			check:    function ( form, field, value ) {
				var min = $( field ).attr( 'minlength' );
				return valgt.length !== 0 && valgt.length < min;
			},
			message:  function ( form, field, value ) {
				return 'This field must be at least ' + $( field ).attr( 'minlength' ) + ' characters long.';
			}
		},
		maxLength:    {
			// Max Length Checks
			preCheck: function ( form, field ) {
				return $( field ).attr( 'maxlength' ) !== undefined;
			},
			check:    function ( form, field, value ) {
				return valgt.length > $( field ).attr( 'maxlength' );
			},
			message:  function ( form, field, value ) {
				return 'This field must not be longer than ' + $( field ).attr( 'maxlength' ) + ' characters.';
			}
		},
		helper:       {
			checkValidType: function ( field, type ) {
				var types = ( $( field ).data( 'valid-type' ) || '' ).split( ' ' );
				return $.inArray( type, types ) !== -1;
			},
			isEmpty:        function ( form, field, value ) {
				var type = $( field ).attr( 'type' ),
					checked = $( field ).is( ":checked" );

				if ( typeof value === 'object' ) {
					var i;
					for ( i in value ) {
						var val = value[ i ];
						if ( val.checked === true ) {
							return false;
						}
					}
					return true;
				}

				if ( value === '' || ( type === 'checkbox' && !checked ) ) {
					return true;
				}
				return false;
			}
		}
	},
	getStateValue: function ( field, value ) {
		// State Field Validation
		if ( $( field ).attr( 'type' ) === 'checkbox' ) {
			var i = 0,
				values = {},
				checkBoxes = $( field ).closest( '.checkboxes' ).find( 'input[type=checkbox]' ).each( function () {
					values[ i++ ] = { 'value': this.value, 'checked': $( this ).is( ":checked" ) };
				} );
			return values;
		}
		return value;
	},
	doVal:         function ( form, field ) {

		gt.form.validate.error = { 'field': field, 'message': '' };

		var value = gt.form.getValue( field );
		value = gt.form.validate.getStateValue( field, value );

		var group = null;
		for ( group in gt.form.validate.groups ) {
			if ( group !== 'helper' && gt.form.validate.groups.hasOwnProperty( group ) ) {
				var func = gt.form.validate.groups[ group ],
					preCheck = true;
				if ( typeof func.preCheck === 'function' ) {
					preCheck = func.preCheck( form, field, value );
				}
				if ( preCheck ) {
					if ( func.check( form, field, value ) ) {
						if ( typeof func.message === 'function' ) {
							func.message = func.message( form, field, value );
						}
						gt.form.validate.error.message = func.message;
					}
				}
			}
		}

	},
	showError:     function ( form ) {

		var error = gt.form.validate.error;

		// Validation Type
		var valType = $( form ).data( 'validation' );
		if ( $( form ).prop( "tagName" ) !== 'form' ) {
			if ( valType === undefined ) {
				valType = $( form ).closest( 'form' ).data( 'validation' );
			}
		}

		if ( undefined === error.field ) {
			return;
		}

		var selector = error.field;
		if ( error.name !== undefined ) {
			selector = ':input[id$="_' + error.field + '"]';
		}

		// Tooltip Validation
		if ( valType === undefined || valType === 'tooltip' ) {
			$( form ).find( selector )
				.addClass( 'error' )
				.attr( 'title', error.message )
				.tooltip( { trigger: 'manual' } )
				.tooltip( 'show' );
			return;
		}

		var msg = '';
		// Post Inline Validation
		if ( valType === 'post-inline' ) {
			if ( $( form ).find( selector ).attr( 'id' ) === 'campaign_states' ) {
				selector = $( form ).find( selector ).closest( '.checkboxes' ).children( '.well' ).children( '.description' );
			}
			if ( $( form ).find( selector ).attr( 'type' ) === 'checkbox' ) {
				selector = $( form ).find( selector ).next( 'label' );
			}

			$( form ).find( selector ).addClass( 'error' );

			msg = '<strong>Error: </strong> ' + error.message;
			$( '<div/>' ).addClass( 'alert alert-error' )
				.append( msg )
				.css( { 'display': 'inline', 'margin-left': '5px' } )
				.insertAfter( $( form ).find( selector ) );
			return;
		}

		// Post Block Validation
		if ( valType === 'post-block' ) {
			if ( $( form ).find( selector ).attr( 'id' ) === 'campaign_states' ) {
				selector = $( form ).find( selector ).closest( '.checkboxes' ).children( '.well' ).children( '.description' );
			}
			if ( $( form ).find( selector ).attr( 'type' ) === 'checkbox' ) {
				selector = $( form ).find( selector ).next( 'label' );
			}

			var field = $( form ).find( selector );

			if ( $( field ).hasClass( 'error' ) ) {
				return;
			}

			field.addClass( 'error' );

			msg = '<i class="icon-warning-sign error-icon"></i>' + error.message;

			$( '<p/>' )
				.addClass( 'text-error' )
				.append( msg )
				.insertAfter( field );
			return;
		}
	},
	removeError:   function ( form, field ) {


		// Validation Type
		var valType = $( form ).data( 'validation' );
		if ( $( form ).prop( "tagName" ) !== 'form' ) {
			if ( valType === undefined ) {
				valType = $( form ).closest( 'form' ).data( 'validation' );
			}
		}

		// Tooltip Validation
		if ( valType === undefined || valType === 'tooltip' ) {
			$( form ).find( field )
				.removeClass( 'error' )
				.tooltip( 'destroy' )
				.removeAttr( 'data-original-title' );
			return;
		}

		if ( valType === 'post-inline' ) {
			if ( $( form ).find( field ).attr( 'id' ) === 'campaign_states' ) {
				field = $( form ).find( field ).closest( '.checkboxes' ).children( '.well' ).children( '.description' );
			}
			if ( $( form ).find( field ).attr( 'type' ) === 'checkbox' ) {
				field = $( form ).find( field ).next( 'label' );
			}

			$( form ).find( field ).removeClass( 'error' );
			$( form ).find( field ).next( '.alert' ).remove();
			return;
		}

		if ( valType === 'post-block' ) {
			if ( $( form ).find( field ).attr( 'id' ) === 'campaign_states' ) {
				field = $( form ).find( field ).closest( '.checkboxes' ).children( '.well' ).children( '.description' );
			}
			if ( $( form ).find( field ).attr( 'type' ) === 'checkbox' ) {
				field = $( form ).find( field ).next( 'label' );
			}

			$( form ).find( field ).removeClass( 'error' );
			$( form ).find( field ).next( 'p.text-error' ).remove();
		}
	},
	showSuccess:   function () {
		$( 'form' )[0].reset();
		$( '#successMessage' ).slideDown();
	}
};
