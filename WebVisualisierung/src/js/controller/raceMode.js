//const store = require('store2');
const tracking = require('controller/trackingData.js');
const paper = require('paper/dist/paper-full.js');

module.exports = {
	/**
	 * Boostrapping of settings
	 */
	bootstrap: function()
	{
		this.initializeRaceMode();
	},
	
	/**
	 * Initialize settings on store
	 */
	initializeRaceMode: function(reset)
	{
	},
	
	/**
	 * saves changed Car Informations like speed
	 */
//	saveCarSpeed : function(){
//		return store.namespace('speed');
//	}
	
}