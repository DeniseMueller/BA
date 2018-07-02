const store = require('store2');

module.exports = {
	
	DEFAULT_URL: null,	

	/**
	 * Boostrapping of settings
	 */
	bootstrap: function()
	{
		if ( DEFAULT_URL_SERVICE ) {
			this.DEFAULT_URL = DEFAULT_URL_SERVICE;
		}
		else {
			this.DEFAULT_URL = window.location.protocol + '//' + window.location.hostname + ( window.location.port ? ':' + window.location.port : '') + '/';
		}
		this.initializeSettings();
	},
	
	/**
	 * Initialize settings on store
	 */
	initializeSettings: function(reset)
	{		
		settings = store.namespace('settings');
		if ( reset || settings.size() == 0 ) {
			settings({
				serverURL: this.DEFAULT_URL
			});
		}
	},
	
	getSettings: function()
	{
		return store.namespace('settings');
	}	
}