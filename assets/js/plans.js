


//JavaScript for Google Place API
$(document).ready(function() {

var city = "raleigh"; 
var APIkey = "AIzaSyALJbj11Xt_-8qRs3J4ucmPViDVVl3YBOY";
var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+"
				+ city+ "&key=" + APIkey;

	$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);

		     for (i = 0; i<5; i++) {
		     	console.log(response.results[i].name);

		     }

		    
		}); 





});//end doc.ready