/**
 * 
 */
require('moment');
const pix = require('pixfinder');
const paper = require('paper/dist/paper-full.js');
const image2base64 = require('image-to-base64');
const beginningPosition = [ 0, 0 ];
var lastX = null;
var lastY = null;
var startTime = moment();
var counter = 0;
var url = '10.150.20.104';
var lapz = null;

var car = {};
var cars = {};

/*
 * object for car information
 */
var displayObj = {
	name : 'Fahrzeug #' + car.id,
	speed : 0,
	time : 0,
	bestTime : 0,
	lapCounter : 1,
	lastLaps : [],
};

var ws = new WebSocket('ws://' + url + ':8765');

 console.log(ws);
 ws.onopen = function(){
	 sendRequest('road');
	 // timeout for pretending errors
	 setTimeout(sendRequest('tracking'), 1000);
 }

var sendRequest = function(requestMessage){
	ws.send(requestMessage);
}


ws.onmessage = function(message) {
	counter = counter+1;
	var data = JSON.parse(message.data);
	this.handleSocketMessage(data);
}

module.exports = {
		
	handleSocketMessage: function(data){
		if(!data.pictures){
			cars = data.track.cars;
			setTimeout(this.setLastPosition, 9000);
			// default car
			// change after click on carImage at web
			car = cars[0].car;
			displayObj.time = Math.round((Math.abs(moment(startTime).diff(moment(data.track.timestamp)))) / 1000);
			this.getCarInformation();
		}else{
			console.log(data);
			var element = document.getElementById("mycanvas");
			element.width = data.pictures.width;
			element.height = data.pictures.height;
			this.getImage(data.pictures, element);
		}
	},
		
	/**
	 * get image from fileserver
	 */
	getImage : function(data, canvas){
		if(!canvas){
			canvas = document.getElementById("mycanvas");
		}
		image2base64(data.pictures.binary)
		.then(
				(response) => {
					console.log(response);
					var fileAsBase64Src = require(response);
					document.write('<img src="' + fileAsBase64Src + '" />');
				}
		)
		.catch(
				(error) => {
					console.log(error);
				}
		);
	},

	/*
	 * remember last Position for calculating speed
	 */
	setLastPosition : function(){
		lastX = car.point[0];
		lastY = car.point[1];
	},

	/**
	 * extract coordinates based on color
	 */
	getRoad : function(doc, callback) {
		
		var img = document.getElementById('fahrbahnImageBinary');
		var road = null; 
		var segments = [];
		if(callback){
			pix.util.dom.onload(img, function() {
				road = pix.findAll({
			        img: img,
			        accuracy : 1,
			        colors: ['ffffff'],
			    });
				// need only one array
				// road = multiple arrays
				for (var i = 0; i < road.length; i++) {
					var index = road[i];
					for (var j = 0; j < index.length; j++) {
						segments[j] = [index[j].x, index[j].y]
					}
				}
			});
			callback(segments);
		}
	},
	
	/**
	 * called after displaying cars
	 */
	start : function() {
		// need more than 1 coordinate to calculate Speed
		if (counter >= 2) {
			displayObj.speed = this.getSpeed();
		}
		if (this.isALap()) {
			this.stop();
		}
		this.bestTime();
	},

	/**
	 * reset Informations like time add lap
	 */
	stop : function() {
		var timer = displayObj.time;
		startTime = moment();
		displayObj.lapCounter = displayObj.lapCounter++;
		if (displayObj.lastLaps.length > 3) {
			displayObj.lastLaps.shift();
		}
	},

	/**
	 * checks if car already get a lap
	 */
	isALap : function() {
		var lap = false;
		if (car.point) {
			if (beginningPosition[0] == car.point[0]
					&& beginningPosition[1] == car.point[1]) {
				lap = true;
			}
		}
		return lap;
	},

	/**
	 * Calculation of speed
	 */
	getSpeed : function() {
		var s = this.calculateDistance();
		var t = Math.abs(moment(startTime).diff(car.timestamp));
		var v = s / t;
		// for better visualisation
		v = Math.round(v*100);
		// strecke/zeit
		// strecke: zwei letzten Punkte und Kurve berechnen (Integralrechnung)
		
		return v;
	},

	bestTime : function() {
		min = displayObj.lastLaps[0];
		for (var i = 0; i < displayObj.lastLaps.length; i++) {
			if (displayObj.lastLaps[i] < min) {
				min = displayObj.lastLaps[i]
			}
		}
		displayObj.bestTime = min;
	},

	/**
	 * TODO:Integral didnt work... alternative
	 */
	calculateDistance : function() {
		var xDiff = lastX - car.point[0];
		xDiff = Math.abs(xDiff);
		var yDiff = lastY - car.point[1];
		yDiff = Math.abs(yDiff);
		return (xDiff + yDiff);
	},

	/**
	 * handles when to start getting information and car object TODO: change car
	 * Object to selectedCar
	 */
	getCarInformation : function(callback, selectedCar) {
		this.start();
		// Default speed
		if (!displayObj.speed) {
			displayObj.speed = 3;
		}
		// pretend to be undefined
		if (!car.id) {
			car.id = '-1';
			displayObj.name = 'Fahrzeug #' + car.id;
		}
		if(callback){
			callback();
		}
		return displayObj;
	},
	
	/**
	 * request for replying cars List
	 */
	getCarCoordinates : function(callback){
		for (var i = 0; i < cars.length; i++) {
			
		}
		if(cars && callback){
			callback(cars);
		}
	},
	
}