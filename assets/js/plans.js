

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








	$('#submit-button').on('click', function(e){
		e.preventDefault();
		
		var startDate = $('#date-input').val();
		var zipCode = $('#zip-input').val();

		var api = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&zip=' + zipCode + '&api_key=3c7u9b4fnquyfbbkqzc2tzgj';
		console.log(startDate);

		$.ajax({url: api, method: 'GET'})
			.done(function(data){
				console.log(data);
				
				var movieList = $('<ul id="movieList">');
				for (var i=0; i<data.length; i++){
					var rating = "Not Rated";
					if (data[i].hasOwnProperty("ratings")){
						var rating = data[i].ratings[0].code;
						console.log(rating);
					}


					
					
					$(movieList).append('<li class="movieItem"><h3>' + data[i].title + '</h3>' + 
											 '<section id="movie">' + '<p class=rating>' + rating);

					
				}
				$('#movieDisplay').append(movieList);
		});
	});
});//end doc.ready
