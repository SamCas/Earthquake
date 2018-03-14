$(function(){

	var geoNamesApi = 'http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo';

	$.ajax({
		type: 'GET',
		url: geoNamesApi,
	  	succes: function(data){
	  		console.log('succes', data);
	  	}
	});

	$('#test').click(function() {
		$('#texts').fadeOut('slow', function() {
			console.log('finish');
		});
	});
});