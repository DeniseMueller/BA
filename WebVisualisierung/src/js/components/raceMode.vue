<template>
<div>
	<div class="row">
		<p></p>
		<div class="card col-xl-8">
			<h5>Fahrbahn</h5>
			<canvas class="border" width="900" height="726" id="mycanvas"></canvas>
			<img id="fahrbahnImageBinary" width="850" height="700"
				src="~/img/binary.png" style="display: none" />
			<!-- 			when color isn't passed over websocket take these images -->
			<img id="carImage2" class="carImage" src="~/img/carORANGE.png" /> <img
				id="carImage3" class="carImage" src="~/img/carLIGHTBLUE.png" /> <img
				id="carImage4" class="carImage" src="~/img/carYELLOW.png" />
			<hr color="#c2cfd6" />
			<div class="row">
				<button class="btn btn-sm ghost-button border col-sm-6"
					v-on:click="draw">
					<i class="fas fa-pencil-alt"></i> Fahrbahn visualisieren
				</button>
				<button class="btn btn-sm ghost-button border col-sm-6"
					v-on:click="drawOriginal">
					<i class="fas fa-pencil-alt"></i> Fahrbahn original darstellen
				</button>
				<!-- 				<audio controls preload="auto"><source id="carSound" src="~/img/carSound.mp3" type="audio/mpeg"></audio> -->
			</div>
		</div>
		<div class="card col-xl-4">
			<h5>Aktuelles Fahrzeug:</h5>
			<table class="table table-dark">
				<tbody>
					<tr>
						<th scope="name">Name:</th>
						<!-- 						default Car color  -->
						<td><h6>{{car.name}}</h6> <img id="carName"
							src="~/img/carORANGE.png" width="50" height="30"
							style="margin-top: 10px;" /></td>
					</tr>
					<tr>
						<th scope="lap">Runde</th>
						<td><h6>{{car.lapCounter}}</h6></td>
					</tr>
					<tr>
						<th scope="speed">Geschwindigkeit:</th>
						<td><h6>{{car.speed}} km/h</h6></td>
					</tr>
					<tr>
						<th scope="time">Beste Zeit:</th>
						<td><h6>{{car.bestTime}} Sekunden</h6></td>
					</tr>
					<tr>
						<th scope="currenttime">Aktuelle Runde:</th>
						<td><h6>{{car.time}} Sekunden</h6></td>
					</tr>
				</tbody>
			</table>
			<hr color="#c2cfd6" />
			<div>
				<div class="card col-sm-12">
					<h6>Geschwindigkeit ändern:</h6>
					<input class="h1 inputVue" v-on:keyup.enter="save" type="number"
						v-model="car.speed"></input>
				</div>
			</div>
			<hr color="#c2cfd6" />
			<div>
				<div class="card col-sm-12">
					<h6>Letzte Runden:</h6>
					<table class="table table-dark">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Zeit</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(lap, index) in car.lastLaps">
								<th scope="row">{{index + 1}}</th>
								<td>{{lap}} Minuten</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<hr color="#c2cfd6" />
			<div>
				<button id="btButton"
					class="btn btn-sm  ghost-button border col-sm-6">Nach
					Fahrzeugen suchen</button>
			</div>
		</div>
	</div>
</div>
</template>
<style>
</style>

<script>	
	const TrackingCtrl = require('controller/trackingData.js');
	const paper = require('paper/dist/paper-full.js');
	const carColors = ['carGREEN', 'carBLUE', 'carORANGE', 'carGRAY', 'carLIGHTGREEN', 'carLIGHTGRAY', 'carLIGHTBLUE', 'carLILA', 'carRED', 'carPINK', 'carWHITE', 'carYELLOW']
	const carShape = [];
	const degree = [];
	export default {
		data: function() 
		{		
 			return {
 				car: TrackingCtrl.getCarInformation(this.drawCar),
 			}
 		},
 		methods: {
 			// Save speed to car WebBluetooth
	 		save: function() {
	 		//TODO SAVE TO CAR --> WEB BLUETOOTH
	 			console.log('SAVING...');
	 			//var saveSpeed = RaceCtrl.saveCarSpeed();
	 			//saveSpeed.set('speed', this.speed);
	 			//this.$snotify['success']('Saved "'+this.speed+'"km/h successfully', 'Geschwindigkeit');
	 		},
	 		//drawing original Road (picture)
	 		//delete drawing part
	 		drawOriginal : function(){
				var element = document.getElementById("mycanvas");
 	 		    var context = element.getContext('2d');
 		        context.clearRect(0, 0, element.width, element.height);
 	 			element.classList.add("road");
 	 			this.drawCar();
	 		},
	 		// drawing road by coordinates
	 		draw : function(){
				var element = document.getElementById("mycanvas");
 	 			element.classList.remove("road");
	 			this.$snotify['success']('Fahrbahn wird gezeichnet...')
	 			var self = this;
	 			var coordinates = null;
	 			TrackingCtrl.getRoad(this, function(data){
		 			coordinates = data;
		 			if(!coordinates){
		 				self.$snotify['error']('Fahrbahn kann nicht geladen werden. Versuche es später noch einmal.')
		 			}
		 		   if(!self.init){
		 		        paper.setup(document.getElementById('mycanvas'))
		 		        self.init = true;
		 		   }
		 		var path = new paper.Path({
		 				segments: coordinates,
		 				strokeColor: '#ffffff',
		 				strokeWidth: 120,
		 				closed : true,
		 			});
		 		path.smooth();
		 		path.view.draw();
	 			});
				self.drawCar();
	 		 },
	 		 //drawing car by image
	 		drawCar : function(){
	 		   	var cars = null;
	 		  	var car = null;
	 		   	TrackingCtrl.getCarCoordinates(function(data){
		 		   	cars = data;
		 		   		if(cars){
			 		   		for (var i = 0; i < cars.length; i++) {
			 		   			car = cars[i].car;
			 		   			if(car.orientation){
				 		   			var zahl = (car.orientation[1]/car.orientation[0]);
				 		   			var rad = Math.atan(zahl);
				 		   			degree[i] = 360 / (2 * Math.PI) * rad;
			 		   				if(car.orientation[0] < 0){
			 		   					degree[i] = degree[i] + 180;
			 		   				}
				 		   		}
					 		   	var carImage = document.getElementById('carImage'+car.id);
				 		   		if (carShape[i]){
					 		   		carShape[i].remove();
				 		   		}
								carShape[i] = new paper.Raster(carImage);
								carShape[i].position = new paper.Point(car.point[0], car.point[1]);
					 			carShape[i].scale(0.18);
					 			carShape[i].rotate(Math.round(degree[i]));
					 			carShape[i].view.draw();
								carShape[i].bringToFront();
			 		   		}
		 		   		}else{
		 		   			this.$snotify['warning']('Kein Fahrzeug wird zur Zeit getrackt.')
		 		   		}
	 		   	});
	 		}
	 	},
  	}
</script>