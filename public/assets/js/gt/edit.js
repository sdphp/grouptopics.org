gt.edit = {
	initialize:        function ( div, sel ) {

		if ( typeof sel == 'undefined' ) var sel = '.edit';
		if ( typeof div == 'undefined' )  var div = 'body';

		var items = $( div ).find( sel );
		if ( items.length < 1 ) return false;
		gt.edit.init( div + ' ' + sel );
	},
	getUrl:            function ( div ) {
		return $( div ).data( 'edit-url' );
	},
	getType:           function ( div ) {
		return     $( div ).data( 'edit-type' ) != '' ? $( div ).data( 'edit-type' ) : 'input';
	},
	getSaveType:       function ( div ) {
		return $( div ).data( 'save-type' ) != '' ? $( div ).data( 'save-type' ) : 'button';
	},
	blur:              function () {
		if( gt.edit.saveData( this ) === false ) return false;
	},
	click:             function () {
		if ( $( this ).data( 'has-click' ) ) return false;
		if ( false === gt.config.form.edit.events.beforeOpen( this ) ) return false;

		$( this ).attr( 'contenteditable', true ).addClass( gt.config.form.edit.className );

		if ( $( this ).hasClass( 'placeholder' ) )
			$( this ).text( '' ).removeClass( 'placeholder' );

		$( this ).data( 'old', $( this ).text() );
		$( this ).focus();

		//$( this ).on( 'keydown', gt.edit.checkPreSaveRules );

		gt.edit.setSaveEvent( this );

		$( this ).data( 'has-click', true );
		if ( false === gt.config.form.edit.events.open( this ) ) return false;
	},
	init:              function ( selector ) {
		var contentEditableSupport = $( '<div/>' )[0].contentEditable == 'inherit';
		if ( !contentEditableSupport ) return false;

		//gt.edit.destroy( selector );
		$( selector ).on( 'click', gt.edit.click );
		this.checkPlaceholders( selector );
	},
	checkPlaceholders: function ( selector ) {
		if ( typeof selector == 'string' )
			return $( selector + ':empty' )
				.text( gt.config.form.edit.placeholder )
				.addClass( 'placeholder' );

		if ( $( selector ).is( ':empty' ) )
			return $( selector )
				.text( gt.config.form.edit.placeholder )
				.addClass( 'placeholder' );
	},
	setSaveEvent:      function ( field ) {
		var type = this.getSaveType( field );
		if ( type == 'blur' ) {
			gt.edit.setBlurEvent( field );
			return;
		}
		if ( type == 'button' ) {
			gt.edit.addButtons( field );
			gt.edit.setButtonEvent( field );
			return;
		}
	},
	checkPreSaveRules:          function ( event ) {
		var rules = eval( '[' + $( this ).data( 'edit-rules' ) + ']' )[ 0 ],
			text  = $( this ).text();
		if( typeof rules.maxlength  != 'undefined' )
		{
			if( $.inArray( event.which, [ 8, 37, 38, 39, 40, 46 ] ) < 0 && text.length >= rules.maxlength )
			{
				event.preventDefault();
			}
		}
	},
	checkSaveRules:          function ( field ) {
		var form       = $( field ).parent();

		form.data( 'validation', 'post-block' );

		var isValid = true;

		gt.form.validate.removeError( form , field )
		gt.form.validate.doVal( form, field )

		var isFieldValid = gt.form.validate.error.message == '';

		if( !isFieldValid )
		{
			isValid = false;
			gt.form.validate.showError( form );
		}
		return isValid;
	},
	addButtons:        function ( field ) {
		var submit = $( '<a/>' ).addClass( gt.config.form.edit.save.buttons.save.className ).html( gt.config.form.edit.save.buttons.save.innerHtml );
		var cancel = $( '<a/>' ).addClass( gt.config.form.edit.save.buttons.cancel.className ).html( gt.config.form.edit.save.buttons.cancel.innerHtml );
		cancel.insertAfter( $( field ) );
		submit.insertAfter( $( field ) );
	},
	setButtonEvent:    function ( field ) {
		var par = $( field ).parent(),
			save = par.find( '.' + gt.config.form.edit.save.buttons.save.className.replace( / /g, '.' ) ),
			cancel = par.find( '.' + gt.config.form.edit.save.buttons.cancel.className.replace( / /g, '.' ) );
		save.on( 'click', function () {
			if( gt.edit.saveData( field ) === false ) return false;
			save.remove();
			cancel.remove();
		} );
		cancel.on( 'click', function () {
			gt.edit.resetData( field );
			par.data( 'validation', 'post-block' );
			gt.form.validate.removeError( par , field )
			save.remove();
			cancel.remove();
		} );
	},
	setBlurEvent:      function ( field ) {
		$( field ).on( 'blur', gt.edit.blur );
	},
	saveData:          function ( field ) {
		if( !gt.edit.checkSaveRules( field ) ) return false;

		if ( $( field ).hasClass( gt.config.form.edit.className ) ) {
			if ( $( field ).data( 'old' ) != $( field ).text() ) {
				var saveUrl = this.getUrl( field );
				$.ajax( {
					url:      saveUrl,
					type:     'POST',
					data:     gt.config.form.edit.save.content( $( field ).text() ),
					dataType: 'json',
					success:  function ( data ) {
						$( field ).removeData( 'old' );
						if ( false === gt.config.form.edit.events.save( data, field ) ) return false;
						$( field ).text( data );
					},
					complete: function ( xhr, status ) {
						if ( false === gt.config.form.edit.events.complete( xhr, status, field ) ) return false;
						gt.edit.resetData( field );
					},
					error:    function ( xhr, status, et ) {
						if ( false === gt.config.form.edit.events.error( xhr, status, et, field ) ) return false;
					}
				} );
			}
			else {
				gt.edit.resetData( field );
			}
		}
	},
	resetData:         function ( field ) {
		gt.edit.destroy( field );
		if ( false === gt.config.form.edit.events.close( field ) ) return false;
		gt.edit.init( field );
	},
	destroy:           function ( selector ) {
		$( selector ).off( 'click', gt.edit.click );
		$( selector ).off( 'blur', gt.edit.blur );
		$( selector ).off( 'keyup', gt.edit.setRules );
		$( selector ).off( 'keydown', gt.edit.setRules );
		$( selector ).removeData( 'has-click' );
		$( selector ).removeAttr( 'contenteditable' );
		$( selector ).removeClass( gt.config.form.edit.className );

		if ( typeof selector == 'string' ) {
			$( selector + ':data(old)' ).each( function () {
				$( selector ).text( $( selector ).data( 'old' ) );
			} )
		}
		else {
			if ( typeof $( selector ).data( 'old' ) != 'undefined' )
				$( selector ).text( $( selector ).data( 'old' ) );
		}
	}
}

