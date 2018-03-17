function initMap() {

	// 'http://api.geonames.org/earthquakesJSON?north=0.038777&south=-18.65232900000001&east=49.4483&west=-89.38670009999998&username=samdino'
	var north = 0.038777;
	var south = -18.65232900000001;
	var east =49.4483;
	var west = -89.38670009999998;

	var requestURL = 'http://api.geonames.org/earthquakesJSON?north=' + north + '&south=' + south + '&east=' + east + '&west=' + west + '&username=samdino';
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

	     // Create the search box and link it to the UI element.
	     var input = document.getElementById('place-search');
	     var searchBox = new google.maps.places.SearchBox(input);
	     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        var rectangles = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });

          markers = [];
          rectangles = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          console.log(bounds);
          console.log(bounds.b.b, bounds.b.f, bounds.f.b, bounds.f.f);
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

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));
            
            rectangles.push(new google.maps.Rectangle({
            	strokeColor: '#FF0000',
		         strokeOpacity: 0.8,
		         strokeWeight: 2,
		         fillColor: '#FF0000',
		         fillOpacity: 0.15,
		         map: map,
		         bounds: bounds
            }));

	         // var rectangle = new google.maps.Rectangle({
		        //   strokeColor: '#FF0000',
		        //   strokeOpacity: 0.8,
		        //   strokeWeight: 2,
		        //   fillColor: '#FF0000',
		        //   fillOpacity: 0.35,
		        //   map: map,
		        //   bounds: bounds
		        // });

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }



	// function addMarker(coords, date, mag, depth, su){
 //  		marker = new google.maps.Marker({
 //    	position: coords,
 //    	map: map,
 //    	title: date,
 //    	icon: {
 //         path: google.maps.SymbolPath.CIRCLE,
 //         scale: mag
 //       }
 //  	});

	// 	


