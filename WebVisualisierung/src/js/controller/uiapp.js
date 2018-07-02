const swal = require('sweetalert2');
const Settings = require('controller/settings.js');
const BluetoothDevice = require('web-bluetooth');
require('clientjs');

/**
 * Basic controller of UI
 * 
 * @changes 2018-03-18 / denisemueller / Created
 * 
 * @author denisemueller
 * @version 1.0.0
 * 
 */
module.exports = {
	
	/**
	 * Global static configuration
	 */
	CONFIG: {
		PERIOD_WATCHDOG: 1000
	},	
	
	/**
	 * Global event enumeration
	 */
	EVENTS: {
		APPLICATION_INFO_RECEIVED: 'onApplicationInfoReceived',
		BACKEND_CONNECTION_ONLINE: 'onBackendConnectionOnline',
		BACKEND_CONNECTION_OFFLINE: 'onBackendConnectionOffline',		
		NOTIFY_ERROR: 'onNotificationError',		
	},
	
	// Fingerprint library
	client: new ClientJS(),	
	// TODO:
	bt: new BluetoothDevice(),

	/**
	 * Bootstrapping of controller
	 */
	bootstrap: function()
	{				
		vm.$events.listen(this.EVENTS.NOTIFY_ERROR, this.handleErrorResponse.bind(this) );
		this.showPageLoader(false);
		// TODO
		var self = this;
		var element = document.getElementById('btButton');
//		element.addEventListener('click', function(event) {
//			console.log(event);
//			self.getBluetoothDevices();
//		})
	},
	
	/**
	 * Controls page loader
	 */
	showPageLoader: function(visible) 
	{
		if ( visible ) {
			$('.page-loader').fadeIn();
		}
		else {
			setTimeout(function() {	$('.page-loader').fadeOut(); }, 500);
		}
	},
	
	/**
	 * test Web Bluetooth
	 */
	getBluetoothDevices: function(){
		console.log('navigator',navigator);
		if ( navigator.bluetooth ) {
			navigator.bluetooth.requestDevice({
				 filters: [{
					    'listAllDevicesEvenThoughItIsAPoorUserExperience': true,
					    'connectable': false
			  }],
			  optionalServices: ['generic_access']

			})
				.then(function(d){
					console.log('Device',d);
				})
				.catch(error => { console.log(error); });
		}
	},
	
	
	/**
	 * Show a error message
	 */
	showError: function(title, message)
	{
		swal({
	        title: title,
	        text: message,
	        type: 'error',
	        buttonsStyling: false,
	        confirmButtonClass: 'btn btn-sm btn-primary'
	    });
	},
	
	/**
	 * Handles global error responses.
	 */
	handleErrorResponse: function(error)
	{
		if (error.response) {
		      // The request was made and the server responded with a status
				// code
		      // that falls out of the range of 2xx
		      console.log(error.response);
		      this.showError('Service error: ' + error.response.status, (error.response.statusText == "" ? error.response.data : error.response.statusText));
		} 
		else if (error.request) {
		      // The request was made but no response was received
		      // `error.request` is an instance of XMLHttpRequest in the
				// browser and an instance of
		      // http.ClientRequest in node.js
		      console.log(error.request);
		} 
		else {
		      // Something happened in setting up the request that triggered
				// an Error
			this.showError('Service error', error.message);
		}
		console.log(error.config);
	},
	
	/**
	 * URL builder
	 */
	SVCURL: function( serviceURL ) 
	{
		return Settings.getSettings().get('serverURL') + '/' + serviceURL;
	}
}