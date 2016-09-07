

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
		
		

		$.ajax({url: api, method: 'GET'})
			.done(function(data){
				console.log(data);
				
				var movieList = $('<ul class="panel-body list-group" id="movieList">');
				
				for (var i=0; i<10; i++){
					
					var rating = "Not Rated";
					
					if (data[i].hasOwnProperty("ratings")){
				        rating = data[i].ratings[0].code;
					}
					
					$(movieList).append('<li class="movieItem list-group-item"><h3 class="title">' + data[i].title +
										 '</h3><span class="expand">+</span>'+'<p class=rating>' + rating + 
										 '</p>' + '<section class="hide" id="movie' + i + '">');
				}
				$('#movieDisplay').html(movieList);
				for (var i=0; i<data.length; i++){
					var currentMovie = '#movie' + i,
						plot = data[i].shortDescription,
						website = data[i].officialUrl,
						cast = data[i].topCast,
						theaters = [];
						
					$(currentMovie).append('<h4 id="cast">Cast</h4><ul id="cast-members">');
					for (var castMember in cast){
						$(currentMovie + ' #cast-members').append('<li>' + cast[castMember]);
					}
					$(currentMovie).append('<p id="plot">' + plot);
					$(currentMovie).append('<select class="form-control theaters">');
					$(currentMovie).append('<button class="btn btn-default">Buy Tickets</button>');
					$(currentMovie).append('<a class="site" target="_blank" href="' + website + '">Official Website</a>');

					data[i].showtimes.forEach(function(i){
						if (theaters.indexOf(i.theatre.name) == -1){
							theaters.push(i.theatre.name);
						}
					});
					theaters.forEach(function(i){
						$(currentMovie + ' .theaters').append('<option>' + i);
					});

				}
		});
	});
});//end doc.ready

$(document).on('click', '.expand', function(){
	var clickedMovie = $(this).parent();
	$(clickedMovie).find('section').toggleClass('hide');
})