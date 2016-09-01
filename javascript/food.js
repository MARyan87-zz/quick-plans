//JavaScript for Google Place API
$(document).ready() {

var city = ""; 
var APIkey = "AIzaSyALJbj11Xt_-8qRs3J4ucmPViDVVl3YBOY"
var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+"
				+city+ "&key=" + APIkey;


	$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);
		}); 





}//end doc.ready