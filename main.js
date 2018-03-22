var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear() - 1;
var todayTime = new Date();
var h = todayTime.getHours();
var m = todayTime.getMinutes();
var s = todayTime.getSeconds();
let nh = today.getHours();
var dateFormat1 = yyyy + '-' + mm + '-' + dd;
var dateFormat = yyyy + '-' + mm + '-' + dd + ' ' + nh + ':' + m + ':' + s;
// var newDateFormat = dateFormat ;

var newRequestURL = 'http://api.geonames.org/earthquakesJSON?maxRows=10&dateDateMagnitude=' + dateFormat1 + '&north=180&south=-180&east=90&west=-90&username=samdino';
var newRequest = new XMLHttpRequest();
newRequest.open('GET', newRequestURL);
newRequest.responseType = 'json';
newRequest.send();
// console.log(newDateFormat);

function bonusAnswer(bonusEarthquakes) {
	var sortedList = [];
	var list = bonusEarthquakes['earthquakes'];
	
	// var sortedList = sortBy(list, 'magnitude');
	for (i = 0; i < 10; i++) {
		addListObject(list[i].datetime, list[i].lat, list[i].lng, list[i].magnitude);
	}
}

function addListObject(date, lat, lng, magnitude) {
	var createLi = document.createElement('LI');
	var bounsList = 'Date: ' + date + ' Latitude: ' + lat + ' Longitude ' + lng + ' Magnitude ' + magnitude;
	createLi.append(bounsList);
	document.getElementById("earthquakes").append(createLi);
}

function initMap() {

	function showEarthquakes(jsonObj) {

		var earth = jsonObj['earthquakes'];
			// console.log(earth.length);
			for (i = 0; i < earth.length; i++) {
				addMarker({lat:earth[i].lat, lng:earth[i].lng}, earth[i].datetime, earth[i].magnitude, earth[i].depth, earth[i].src);
			}
			// console.log(longi,"-",latit);
		}

		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 38.322, lng: 142.369},
			zoom: 4,
			mapTypeId: 'roadmap'
		});

		var infowindow = new google.maps.InfoWindow();


		function addMarker(coords, date, mag, depth, su){
			markerNew = new google.maps.Marker({
				position: coords,
				map: map,
				title: date,
				icon: {
					path: google.maps.SymbolPath.CIRCLE,
					scale: mag
				}
			});
			google.maps.event.addListener(markerNew, 'click', function() {
				infowindow.setContent('<b>Date: </b>' + date + '<br>' +'<b>The magnitude was: </b>' + mag + '<br>' + '<b>Depth: </b>' + depth + ' km' + '<br>' + '<b>Source: </b>' + su);
				infowindow.open(map, this);
			});
		}

		var input = document.getElementById('place-search');
		var searchBox = new google.maps.places.SearchBox(input);
		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);


		map.addListener('bounds_changed', function() {

			searchBox.setBounds(map.getBounds());

		});

		var markers = [];
		var rectangles = [];

		searchBox.addListener('places_changed', function() {
			var places = searchBox.getPlaces();

			if (places.length == 0) {
				return;
			}


			markers.forEach(function(marker) {
				marker.setMap(null);
			});

			markers = [];
			rectangles = [];

			var bounds = new google.maps.LatLngBounds();
          // console.log(bounds);
          // console.log(bounds.b.b, bounds.b.f, bounds.f.b, bounds.f.f);
          places.forEach(function(place) {
          	if (!place.geometry) {
          		console.log("Returned place contains no geometry");
          		return;
          	}
          	var icon = {
          		url: place.icon,
          		size: new google.maps.Size(71, 71),
          		origin: new google.maps.Point(0, 0),
          		anchor: new google.maps.Point(17, 34),
          		scaledSize: new google.maps.Size(25, 25)
          	};									

          	markers.push(new google.maps.Marker({
          		map: map,
          		icon: icon,
          		title: place.name,
          		position: place.geometry.location
          	}));

            // console.log(position);
            // console.log(bounds.getNorthEast().lat());
            // console.log(markers[0].position.lng());
            // console.log(markers[0].position.lat());

            var north = markers[0].position.lat() + 1.4;
            var south = markers[0].position.lat() - 1.4;
            var east = markers[0].position.lng() + 1.4;
            var west = markers[0].position.lng() - 1.4;

            rectangles.push(new google.maps.Rectangle({
            	strokeColor: '#FF0000',
            	strokeOpacity: 0.8,
            	strokeWeight: 2,
            	fillColor: '#FF0000',
            	fillOpacity: 0.15,
            	map: map,
            	bounds: {
            		north: north,
            		south: south,
            		east: east,
            		west: west
            	}
            }));

            // 'http://api.geonames.org/earthquakesJSON?north=0.038777&south=-18.65232900000001&east=49.4483&west=-89.38670009999998&username=samdino'

            var requestURL = 'http://api.geonames.org/earthquakesJSON?north=' + north + '&south=' + south + '&east=' + east + '&west=' + west + '&username=samdino';
            var request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();

            var count = 0; 
            var latit = [];
            var longi = [];

            request.onload = function() {

            	var earthquakesList = request.response;
            	showEarthquakes(earthquakesList);

            	var earthquakesBounsList = newRequest.response;
            	bonusAnswer(earthquakesBounsList);

            }

            if (place.geometry.viewport) {
            	bounds.union(place.geometry.viewport);
            } else {
            	bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}

