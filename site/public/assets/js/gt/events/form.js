gt.eventBinds.form = {
	bindCollection:   [
		{
			bParent:   document,
			bSelector: 'form',
			bType:     'submit',
			bFunction:  gt.form.doSubmit
		},
		{
			bParent:   'form',
			bSelector: ':input',
			bType:     'change',
			bFunction: function () {
				var form = $(this).closest('form');

				gt.form.validate.doVal( form, $(this) );

				var isValid = true;

				var isFieldValid = gt.form.validate.error.message === '';

				gt.form.validate.removeError( form, this );
				if( !isFieldValid )
				{
					isValid = false;
					gt.form.validate.showError( form );
				}
			}
		},
		{
			bParent:   'form',
			bSelector: ':input',
			bType:     'keypress',
			bFunction: function () {
				var form = $(this).closest('form');
				gt.form.validate.removeError( form, this );
			}
		},
		{
			bCondition: !Modernizr.input.placeholder,
			bParent:    'form',
			bSelector:  '[placeholder]',
			bType:      'focus',
			bFunction:  gt.form.placeholder.focus
		},
		{
			bCondition: !Modernizr.input.placeholder,
			bParent:    'form',
			bSelector:  '[placeholder]',
			bType:      'blur',
			bFunction:  gt.form.placeholder.blur
		},
		{
			bParent:   document,
			bSelector: 'div.input-prepend .add-on, div.input-append .add-on',
			bType:     'click',
			bFunction: function () {
				$( this ).next( ':input' ).trigger( 'focus' );
			}
		},
		{
			bParent:   document,
			bSelector: 'form[data-toggle="file-upload"]',
			bType:     'submit',
			bFunction: gt.form.fileUpload
		},
		{
			bParent:   document,
			bSelector: '.disabled, *[disabled=disabled]',
			bType:     'click',
			bFunction: function () {
				return false;
			}
		}
	],
	onLoadCollection: function () {
		if ( Modernizr.input.placeholder ) {
			$( '[placeholder] ' ).trigger( 'blur' );
		}

		gt.form.buildABTestInput();
	}
};
