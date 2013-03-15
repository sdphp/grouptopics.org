gt.form = {
	ajax:               {
		submit: false
	},
	doSubmit:           function( event ) {
		if ( !Modernizr.input.placeholder ) {
			gt.form.placeholder.wipeValues( $( this ) );
		}
		var valRes = gt.form.validate.submitForm( $( this ), event );
		if ( !valRes ) {
			return false;
		}

		if ( $( this ).hasClass( 'ajax' ) ) {
			return gt.form.ajaxSubmit( $( this ), event );
		}
		return true;
	},
	ajaxSubmit:         function ( form, e  ) {

		if ( gt.form.ajax.submit !== false ) {
			return false;
		}

		gt.form.ajaxLoader.show( form.parent().parent() );
		var errors = form.find( 'div.ajaxErrors' ),
			action = form.attr( 'action' ) === undefined ? window.location.href : form.attr( 'action' );

		if ( action.charAt( action.length - 1 ) !== "/" ) {
			action += '/';
		}

		errors.html( '' );
		$( 'form div.warning' ).removeClass( 'warning' );
		gt.form.ajax.submit = $.ajax(
			{
				url:      action,
				type:     'POST',
				data:     form.serialize(),
				dataType: 'json',
				success:  function ( data ) {
					if ( data.url !== undefined ) {
						window.location.href = data.url;
					}
					if ( data.javascript !== undefined ) {
						eval( data.javascript );
					}
					if ( data.errors !== undefined ) {
						for ( var i in data.errors ) {
							var error = data.errors[i],
								html = '<div class="alert alert-block alert-error fade in">';
							html += '<button type="button" class="close" data-dismiss="alert">×</button><p>';

                            console.log( error );

							// Form Errors
							if( error.field == 'form' )
							{
								html += '<strong>Error:</strong> ' + error.message + "</p>";
								errors.append( html + "</div>" ).hide().fadeIn( 'fast' );

								return;
							}

							if( typeof error.id != 'undefined' )
							{
								// Field errors
								var error_selector = error.id
								$( ':input#' + error_selector ).parent( 'div' ).addClass( 'error' );
								var field = ':input#' + error.id
								if ( error.field == 'email' ) field = ':input[id$="_username"]';
								if ( error.field == 'password' ) field = ':input[id$="_password_second"]';
							}
							else
							{
								var field = ':input[id$="_' + error.field + '"]';
								$( field ).parent( 'div' ).addClass( 'error' );
							}
							gt.form.validate.error = { 'field': field, 'message': error.message };
							gt.form.validate.removeError( form, field );
							gt.form.validate.showError( form );
						}
					}
					var submitButton = form.closest( '.modal' ).find( '.modalSubmit' );
					if ( typeof submitButton != 'undefined' ) {
						submitButton.removeClass( 'disabled' );
						submitButton.attr( 'disabled', '' );
						submitButton.removeAttr( 'disabled' );
						submitButton.text( submitButton.attr( 'old-text' ) );
					}

					gt.form.ajax.submit = false;
					gt.form.ajaxLoader.hide( form.parent().parent() );
				}
			}
		).error(
			function ( e, b, f ) {
				gt.form.ajax.submit = false;
				var submitButton = form.find( '.modalSubmit' );
				submitButton.removeClass( 'disabled' );
				submitButton.attr( 'disabled', '' );
				submitButton.removeAttr( 'disabled' );
				submitButton.text( submitButton.attr( 'old-text' ) );
				gt.form.ajaxLoader.hide( form.parent().parent() );
			}
		);

		e.preventDefault();
		return false;
	},
	buildABTestInput:   function () {
		var tests = [],
			insertAfterDiv = null,
			html = $( '<div class="form_row tabbable tabs-left"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>' ),
			hasTests = false;
		$( 'form .content_data_row' ).each( function () {

			hasTests = true;
			if ( insertAfterDiv == null ) {
				insertAfterDiv = $( this ).prev( 'div.form_row' );
			}

			if ( html.children( 'label' ).length < 1 ) {
				var label = $( this ).find( 'label' ).eq( 0 ).text();
				html.prepend( $( '<label>' + label + '</label>' ) )
			}

			if ( tests.length == 0 )
				tabText = 'Test A';
			else
				tabText = 'Test B'

			var linkHtml = $( '<li><a href="#tab' + ( tests.length + 1 ) + '" data-toggle="tab"><span class="text">' + tabText + '</span></a></li>' ),
				tabHtml = $( '<div class="tab-pane" id="tab' + ( tests.length + 1 ) + '"></div>' );

			if ( tests.length < 1 ) {
				linkHtml.addClass( 'active' );
				tabHtml.addClass( 'active' );
			}

			$( this ).children( 'label' ).remove();
			;

			tabHtml.prepend( $( this ).html() );

			html.find( 'ul.nav' ).append( linkHtml );
			html.find( 'div.tab-content' ).append( tabHtml );
			tests.push( $( this ).children( 'div' ) )
			$( this ).remove();
		} );
		if ( hasTests ) {
			if ( insertAfterDiv == null ) {
				$( 'form' ).prepend( html );
			}
			else {
				insertAfterDiv.after( html );
			}
		}
	},
	placeholder:        {
		wipeValues: function ( form ) {
			form.find( '[placeholder]' ).each( function () {
				var input = $( this );
				if ( input.val() == input.attr( 'placeholder' ) ) {
					input.val( '' );
				}
			} );
			return true;
		},
		focus:      function () {
			var input = $( this );
			if ( input.val() == input.attr( 'placeholder' ) ) {
				input.val( '' );
				input.removeClass( 'placeholder' );
			}
		},
		blur:       function () {
			var input = $( this );
			if ( input.val() == '' || input.val() == input.attr( 'placeholder' ) ) {
				input.addClass( 'placeholder' );
				input.val( input.attr( 'placeholder' ) );
			}
		}
	},
	toggleBullets:      function ( obj ) {
		var obj = $( obj ),
			par = obj.closest( 'div.controls' );

		if ( obj.hasClass( 'bullets-toggle' ) ) {
			par.children( 'div.bullets' ).show();
			par.children( 'textarea.paragraph' ).hide();
		}
		else if ( obj.hasClass( 'paragraph-toggle' ) ) {
			par.children( 'textarea.paragraph' ).show();
			par.children( 'div.bullets' ).hide();
		}
		return false;
	},
	toggleSelects:      function ( selector ) {
		if ( $( selector + ' div.selectAll a' ).hasClass( 'active' ) ) {
			$( selector + ' div.checkboxes input[type=checkbox]' ).prop( 'checked', false ).trigger( 'change' );
		}
		else {
			$( selector + ' div.checkboxes input[type=checkbox]' ).prop( 'checked', true ).trigger( 'change' );
		}

	},
    getValue: function( field ) {
        return $( field ).is(  ':input' ) ? $( field ).val() : $( field ).text();
    },
	ajaxLoader:         {
		show: function ( container ) {
			container.find( '.ajaxLoading' ).fadeIn();
		},
		hide: function ( container ) {
			container.find( '.ajaxLoading' ).fadeOut();
		}
	},
	fileUpload:         function () {
		var ele = $( this );
		ele.data( 'action', ele.attr( 'action' ) );
		ele.removeAttr( 'action' );
		ele.find( '*[type="submit"]' ).addClass( 'disabled' ).attr( 'disabled', 'disabled' );
		gt.form.ajaxFileUpload(
			{
				url:           ele.data( 'action' ),
				secureuri:     false,
				fileElementId: ele.data( 'file-id' ),
				dataType:      'html',
				success:       function ( data, status ) {
					$( ele.data( 'replace' ) ).html( data );
					if ( typeof ele.data( 'replace-class' ) != 'undefined' ) {
						var sel = $( ele.data( 'replace-class-selector' ) ),
							swap = ele.data( 'replace-class' ).split( ',' ),
							from = gt.trim( swap[ 0 ] ),
							to = gt.trim( swap[ 1 ] );
						if ( sel.hasClass( from ) ) {
							sel.switchClass( from, to, 600 );
						}
					}
					var javascript = $( ele.data( 'replace' ) ).find( '.javascript' );
					try {
						eval( javascript.eq( 0 ).html() );
					}
					catch ( e ) {
						gt.handleError( e, javascript.eq( 0 ).html() )
					}
					javascript.remove();
					ele.find( '*[type="submit"]' ).removeClass( 'disabled' ).attr( 'disabled', '' ).removeAttr( 'disabled' );
				},
				error:         function ( data, status, e ) {
					console.log( 'Error: ' );
					console.log( e );
				}
			}
		)
		return false;
	},
	createUploadIframe: function ( id, uri ) {
		//create frame
		var frameId = 'jUploadFrame' + id;
		var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"';
		if ( window.ActiveXObject ) {
			if ( typeof uri == 'boolean' ) {
				iframeHtml += ' src="' + 'javascript:false' + '"';
			}
			else if ( typeof uri == 'string' ) {
				iframeHtml += ' src="' + uri + '"';
			}
		}
		iframeHtml += ' />';
		$( iframeHtml ).appendTo( document.body );

		return $( '#' + frameId ).get( 0 );
	},
	createUploadForm:   function ( id, fileElementId, data ) {
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = $( '<form action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>' );
		if ( data ) {
			for ( var i in data ) {
				$( '<input type="hidden" name="' + i + '" value="' + data[i] + '" />' ).appendTo( form );
			}
		}
		var oldElement = $( '#' + fileElementId );
		var newElement = $( oldElement ).clone();
		$( oldElement ).attr( 'id', fileId );
		$( oldElement ).before( newElement );
		$( oldElement ).appendTo( form );

		//set attributes
		$( form ).css( 'position', 'absolute' );
		$( form ).css( 'top', '-1200px' );
		$( form ).css( 'left', '-1200px' );
		$( form ).appendTo( 'body' );
		return form;
	},
	ajaxFileUpload:     function ( s ) {
		// TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
		s = $.extend( {}, $.ajaxSettings, s );
		var id = new Date().getTime()
		var form = gt.form.createUploadForm( id, s.fileElementId, (typeof(s.data) == 'undefined' ? false : s.data) );
		var io = gt.form.createUploadIframe( id, s.secureuri );
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;
		// Watch for a new set of requests
		if ( s.global && !$.active++ ) {
			$.event.trigger( "ajaxStart" );
		}
		var requestDone = false;
		// Create the request object
		var xml = {}
		if ( s.global )
			$.event.trigger( "ajaxSend", [xml, s] );
		// Wait for a response to come back
		var uploadCallback = function ( isTimeout ) {
			var io = document.getElementById( frameId );
			try {
				if ( io.contentWindow ) {
					xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;

				} else if ( io.contentDocument ) {
					xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
				}
			} catch ( e ) {
				$.handleError( s, xml, null, e );
				throw e;
			}
			if ( xml || isTimeout == "timeout" ) {
				requestDone = true;
				var status;
				try {
					status = isTimeout != "timeout" ? "success" : "error";
					// Make sure that the request was successful or not modified
					if ( status != "error" ) {

						// process the data (runs the xml through httpData regardless of callback)
						var data = gt.form.uploadHttpData( xml, s.dataType );
						// If a local callback was specified, fire it and pass it the data
						if ( s.success )
							s.success( data, status );

						// Fire the global callback
						if ( s.global )
							$.event.trigger( "ajaxSuccess", [xml, s] );
					} else {
						gt.handleError( s, xml, status );
					}
				} catch ( e ) {
					status = "error";
					gt.handleError( s, xml, status, e );
					throw e;
				}

				// The request was completed
				if ( s.global )
					$.event.trigger( "ajaxComplete", [xml, s] );

				// Handle the global AJAX counter
				if ( s.global && !--$.active )
					$.event.trigger( "ajaxStop" );

				// Process result
				if ( s.complete )
					s.complete( xml, status );

				$( io ).unbind()

				setTimeout( function () {
					try {
						$( io ).remove();
						$( form ).remove();

					} catch ( e ) {
						gt.handleError( s, xml, null, e );
						throw e;
					}

				}, 100 )

				xml = null

			}
		}
		// Timeout checker
		if ( s.timeout > 0 ) {
			setTimeout( function () {
				// Check to see if the request is still happening
				if ( !requestDone ) uploadCallback( "timeout" );
			}, s.timeout );
		}
		try {

			var form = $( '#' + formId );
			$( form ).attr( 'action', s.url );
			$( form ).attr( 'method', 'POST' );
			$( form ).attr( 'target', frameId );
			if ( form.encoding ) {
				$( form ).attr( 'encoding', 'multipart/form-data' );
			}
			else {
				$( form ).attr( 'enctype', 'multipart/form-data' );
			}
			$( form ).submit();

		} catch ( e ) {
			gt.handleError( s, xml, null, e );
		}

		$( '#' + frameId ).load( uploadCallback );
		return {abort: function () {
		}};
	},
	uploadHttpData:     function ( r, type ) {
		var data = !type;
		data = type == "xml" || data ? r.responseXML : r.responseText;
		// Get the JavaScript object, if JSON is used.
		if ( type == "json" )
			eval( "data = " + data );
		// evaluate scripts within html
		if ( type == "html" )
			$( "<div>" ).html( data );

		return data;
	},
	preview:            {
		fetchData:    function ( div ) {
			var div = $( div ),
				contentData = $( div ).closest( 'div[id]:not(.form_row)' ),
				items = {};

			items.descType = $( contentData ).find( 'input[id=description_type]' ).val();
			items.title = $( contentData ).find( 'input[id$=title]' ).val();
			items.image = $( contentData ).find( 'img' ).attr( 'src' );

			if ( items.descType == 'paragraph' )
				items.desc = $( contentData ).find( 'textarea.paragraph' ).val();
			else {
				items.desc = [];
				var bullets = $( contentData ).find( 'input.bullet' ).each( function () {
					items.desc.push( $( this ).val() );
				} )
			}
			return items;
		},
		populateHtml: function ( div, items ) {
			var div = $( div ).closest( 'div[id]:not(.form_row)' ).find( '.account' );

			if ( typeof items.image != 'undefined' )
				div.find( 'img' ).attr( 'src', items.image )

			if ( typeof items.title != 'undefined' )
				div.find( 'div.account-title' ).text( items.title );

			if ( typeof items.descType != 'undefined' ) {
				if ( typeof items.desc == 'string' ) {
					div.find( 'div.account-content-block' ).text( items.desc ).show();
					div.find( 'div.account-content-list' ).hide();
				}
				else if ( typeof items.desc == 'object' ) {
					div.find( 'div.account-content-block' ).hide();
					for( var i in items.desc ) {
						var bullet = items.desc[ i ],
							li = div.find( 'div.account-content-list ul li.account-content-item' ).eq( i );
						li.text( bullet );
					}
					div.find( 'div.account-content-list' ).show();
				}
			}
		}
	},
	transformSelect:    function ( selector, cls ) {
		var inputs = $( selector );
		if ( !cls ) var cls = 'btn';
		inputs.each( function () {
			var selected = $( this ).find( 'option:selected' ).text();
			var options = $( this ).find( 'option' );
			var button = '<span class="' + cls + ' dropdown-toggle" data-toggle="dropdown" href="#">' + selected + '</span>';
			var dropdown = '<ul class="dropdown-menu" role="menu">';
			options.each( function () {
				var value = $( this ).val();
				dropdown += '<li><a class="selectOption" href="#" data-value="' + value + '">' + $( this ).text() + '</a></li>';
			} );
			dropdown += '</ul>';
			var html = '<div class="dropdown">' + button + dropdown + '</div>';
			$( this )
				.hide()
				.parent()
				.prepend( html );
		} );
		$( '.selectOption' ).on( 'click', function () {
			var clickedValue = $( this ).attr( 'data-value' );
			var clickedText = $( this ).text();
			$( this ).closest( 'div.dropdown' ).next( 'select' ).val( clickedValue ).change();
			$( this ).closest( 'div.dropdown' ).find( 'a.dropdown-toggle' ).text( clickedText );
		} );
	},
    descriptionField:   {
        setValue:       function( event ) {
            var field = this,
                div     = $( field ).closest( '.swap_description_row' ),
                type    = $( div ).find( '.description_type').val(),
                val     = type == 'paragraph'
                        ? $( div ).find( 'textarea.paragraph' ).val()
                        : null;
            if( null == val )
            {
                var bullets = {};
                var i = 0;
                $( div ).find( 'div.bullets input' ).each( function() {
                    bullets[ i++ ] = this.value;
                })
                val = $.toJSON( bullets );
            }

            $( div ).find( 'input.hiddenDescription' ).val( val );
        }
    }
}

