gt.eventBinds.transform = {
	bindCollection:   [
		{
			bParent:   document,
			bSelector: '.select-replace-option',
			bType:     'click',
			bFunction: gt.transform.validate.select
		}

	],
	onLoadCollection: function () {
	}
};
