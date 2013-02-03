gt.config = {
	'form': {
		'edit': {
			'save':    {
				'url':     '',
				'content':    function ( val ) {
					return {
						'value': val
					};
				},
				'event':   'blur',
				'buttons': {
					'save':   {
						'innerHtml': 'Save',
						'className':     'edit-save-button btn btn-mini btn-primary'
					},
					'cancel': {
						'innerHtml': 'Cancel',
						'className':     'edit-cancel-button btn btn-mini'
					}
				}
			},
			'style':   {},
			'className':   'editable',
			'placeholder': 'Click to edit...',
			'type':    'input',
			'events':  {
				'beforeOpen':  function ( field ) {
					return true;
				},
				'open':        function ( field ) {
				},
				'save':        function ( data, field ) {
				},
				'error':       function ( xhr, status, et, field ) {
				},
				'complete':    function ( xhr, status, field ) {
				},
				'beforeClose': function ( field ) {
				},
				'close':       function ( field ) {
				}
			}
		}
	},
	'history': {
		'selectors': {
             'body': 'body > div.row-fluid',
             'content': '#mainContent .mainContainer'
		}
	}
}
