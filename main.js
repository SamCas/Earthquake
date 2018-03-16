var requestURL = 'http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=samdino';
var request = new XMLHttpRequest();
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
		for (var i = 0; i < earth.length; i++) {

			latit = earth[i].lng;
			longi = earth[i].lat;

			console.log(longi,"-",latit);
			
		}
	}

function initMap() {

	var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
	});

	var input = document.getElementById('place-search');
    var searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();
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

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

