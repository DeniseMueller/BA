<template>
	<div class="app-body">		
		<div class="sidebar">
			<nav class="sidebar-nav">
				<ul class="nav">					
					<li class="nav-title">Race</li>					
					<li class="nav-item">
						<router-link to="raceMode" tag="a" class="nav-link" active-class="active">
	  						<i class="fas fa-road"></i> Tracking Cars
						</router-link>		 
					</li>
					<li class="nav-title">Extras</li>
					<li class="nav-item">
						<router-link to="settings" tag="a" class="nav-link" active-class="active">
	  						<i class="fas fa-cog"></i> Settings
						</router-link>		 
					</li>
				</ul>
			</nav>
		</div>
		<!-- Main content -->
		<main class="main">
			<div class="container-fluid">
				<div id="ui-view">
					<router-view></router-view>
					<vue-snotify class="material"></vue-snotify>
				</div>
			</div>
		</main>		
	</div>
</template>

<style>
</style>

<script>
	import Settings from 'controller/settings.js'; 
    export default {
    	dependencies : ['BackendConnection'],
    	data: function() {    		
    		return {
    		};
    	},
    	created: function() 
    	{
    	},
    	mounted: function() 
    	{
    		Settings.bootstrap();
    		// Uncomment to provide background service connectivity
    		// this.BackendConnection.bootstrap();
    		App.bootstrap();
    	}    	
    }
</script>