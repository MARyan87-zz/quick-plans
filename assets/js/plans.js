

//JavaScript for Google Place API
$(document).ready(function() {

var city = ""; 
var APIkey = "AIzaSyALJbj11Xt_-8qRs3J4ucmPViDVVl3YBOY"
var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+"
				+city+ "&key=" + APIkey;


	$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);
		}); 








	$('#submit-button').on('click', function(){
		var startDate = $('#date-input').val();
		var zipCode = $('#zip-input').val();

		var api = 'data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&zip=' + zipCode + '&api_key=3c7u9b4fnquyfbbkqzc2tzgj';


		$.ajax({url: api, method: 'GET'})
			.done(function(data){
				

		});
	});



});//end doc.ready
