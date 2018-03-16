var requestURL = 'http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=samdino';
var request = new XMLHttpRequest();
var count = 0;
var latit = [];
var longi = [];

request.open('GET', requestURL);
request.responseType = 'json';
request.send();


function initMap() {

	request.onload = function() {

	var earthquakesList = request.response;
	showEarthquakes(earthquakesList);

	}	

function showEarthquakes(jsonObj) {
	
	var earth = jsonObj['earthquakes'];
	// console.log(earth.length);
	for (i = 0; i < earth.length; i++) {
		addMarker({lat:earth[i].lat, lng:earth[i].lng}, earth[i].datetime, earth[i].magnitude, earth[i].depth, earth[i].src);
	}
	// console.log(longi,"-",latit);
}
	var infowindow = new google.maps.InfoWindow();
	var uluru = {lat: 38.322, lng: 142.369};
       	var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 4,
			center: uluru
        });

    function addMarker(coords, date, mag, depth, su){
     		marker = new google.maps.Marker({
       	position: coords,
       	map: map,
       	title: date,
       	icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: mag
          }
     	});

  		google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<b>Date: </b>' + date + '<br>' +'<b>The magnitude was: </b>' + mag + '<br>' + '<b>Depth: </b>' + depth + ' km' + '<br>' + '<b>Source: </b>' + su);
        infowindow.open(map, this);
      });

    }
}

