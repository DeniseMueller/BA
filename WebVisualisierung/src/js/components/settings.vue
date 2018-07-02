<template>
	<div class="card">
		<div class="card-header">
			<i class="fas fa-cog"></i> Settings
		</div>
		<div class="card-body">
			<div class="row">
				<div class="col-sm-6">
					<div class="form-group">
						<label for="settingServerURL">Backend service URL</label>
				    	<input type="text" id="settingServerURL" class="form-control h1" v-model="serverURL" placeholder="https://1.2.3.4/myservicebase">
					</div>
				</div>
			</div>
		</div>
		<div class="card-footer">
			<button class="btn btn-sm btn-primary" type="submit" v-on:click.stop.prevent="save"><i class="fas fa-check-circle"></i> Submit</button>
			<button class="btn btn-sm btn-secondary" type="reset" v-on:click.stop.prevent="reset"><i class="fas fa-ban"></i> Reset</button>
		</div>
	</div>
</template>

<style>
</style>

<script>
	const SettingsCtrl = require('controller/settings.js');	
	export default {
		data: function() 
		{			
			var settings = SettingsCtrl.getSettings();
 			return  { 				
 				serverURL: settings.get('serverURL')
 			}
 		},
 		methods: {
	 		save: function() 
	 		{
	 			var settings = SettingsCtrl.getSettings();
	 			settings.set('serverURL', this.serverURL);
	 			this.$snotify['success']('Saved "'+this.serverURL+'" successfully', 'Settings');
	 		},
	 		reset: function()
	 		{
	 			SettingsCtrl.initializeSettings(true);
	 			this.serverURL = SettingsCtrl.getSettings().get('serverURL');
	 			this.$snotify['warning']('Settings resetted!', 'Settings');
	 		}
 		}
  	}
</script>