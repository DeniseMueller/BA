var online = null;
module.exports = {

	/**
	 * Boostrapping of command observer
	 */
	bootstrap: function()
	{
		var self = this; 
		var observe = function() {
			self.observeApplicationConnection();			
		};
		// Register events to execute observation methods periodically 
		vm.$events.listen(App.EVENTS.APPLICATION_INFO_RECEIVED, () => setTimeout(observe, App.CONFIG.PERIOD_WATCHDOG));
		// Fallback if app is online.
		vm.$events.listen(App.EVENTS.BACKEND_CONNECTION_OFFLINE, () => setTimeout(observe, 10000));
		// Start initial observer call
		observe();
	},
	
	/**
	 * Start observing application state
	 */
	observeApplicationConnection: function()
	{
		vm.axios.get(App.SVCURL('appcheck'))
			.then(response => {
				if ( !online ) {
					online = true;
					vm.$events.fire(App.EVENTS.BACKEND_CONNECTION_ONLINE);
				}
				vm.$events.fire(App.EVENTS.APPLICATION_INFO_RECEIVED, response.data);
			})
			.catch(function(error) {
				online = false;
				vm.$events.fire(App.EVENTS.BACKEND_CONNECTION_OFFLINE);
			});
	},
}