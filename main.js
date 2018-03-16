var requestURL = 'http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=samdino';
var request = new XMLHttpRequest();
var count = 0;
var latit = [];
var longi = [];

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {

	var earthquakesList = request.response;
	showEarthquakes(earthquakesList);

}	

function showEarthquakes(jsonObj) {
	
	var earth = jsonObj['earthquakes'];
	// console.log(earth.length);
	for (i = 0; i < earth.length; i++) {
		count++;
		latit.push(earth[i].lng);
		longi.push(earth[i].lat);
	}
	// console.log(longi,"-",latit);
}

function initMap() {

	var uluru = {lat: 38.322, lng: 142.369};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });

    var infowindow = new google.maps.InfoWindow();
    var marker;

    for (var i = 0; i < 9; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(Math.random(), Math.random()),
        map: map,
        title: "click me " + i
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('Hello');
          infowindow.open(map, marker);
        }
      })(marker, i));

    }
    // console.log(longi, "-", latit);

	// for (var i = 0; i < 9; i++) {

	// 	var marker = new google.maps.Marker({
	// 		position: new google.maps.LatLng(latit[i], long[i]),
	// 		map = map,
	// 		title: 'earthquakes'
	// 	});
	
	// }

    // for (i = 0; i < locations.length; i++) {  
    //   marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    //     map: map
    //   });
  }

