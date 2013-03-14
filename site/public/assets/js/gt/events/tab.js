gt.eventBinds.tab = {
	bindCollection:
	[
		{
			bParent: document,
			bSelector: '*[data-tabs] a',
			bType: 'click',
			bFunction: gt.tab.show
		}
		
	],
	onLoadCollection: function() {
		gt.tab.initialize();
	}
};
