

//JavaScript for Google Place API
$(document).ready(function() {

	$('#submit-button').on('click', function(e){
		e.preventDefault();
		
		//Movie Search API
		var startDate = $('#date-input').val().trim();
		var zipCode = $('#zip-input').val().trim();
		var api = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&zip=' + zipCode + '&api_key=3c7u9b4fnquyfbbkqzc2tzgj';
		
		

		$.ajax({url: api, method: 'GET'})
			.done(function(data){
				// console.log(data);
				
				var movieList = $('<ul class="panel-body list-group" id="movieList">');
				
				for (var i=0; i<data.length; i++){
					
					var rating = "Not Rated";
					// console.log("Data object: " + data[i]);
					
					if (data[i].hasOwnProperty("ratings")){
				        rating = data[i].ratings[0].code;
					}
					
					$(movieList).append('<li class="movieItem list-group-item"><h3 						class="title">' + data[i].title +
										 '</h3><span class="expand">+</span>'+'<p class=rating>' + rating + 
										 '</p>' + '<section class="hide" id="movie' + i + '">');
				}
				$('#movieDisplay').append(movieList);
				
				for (var i=0; i<data.length; i++){
					var currentMovie = '#movie' + i,
						plot = data[i].shortDescription,
						website = data[i].officialUrl,
						cast = data[i].topCast,
						theaters = [],
						ticketURLs = [];
					
						
					$(currentMovie).append('<h4 id="cast">Cast</h4><ul id="cast-members">');
					for (var castMember in cast){
						$(currentMovie + ' #cast-members').append('<li>' + cast[castMember]);
					}
					$(currentMovie).append('<p id="plot">' + plot);
					$(currentMovie).append('<select class="form-control theaters">');
					$(currentMovie).append('<button id="buy-tickets" class="btn btn-default">Buy Tickets</button>');
					$(currentMovie).append('<a class="site" target="_blank" href="' + website + '">Official Website</a>');

					data[i].showtimes.forEach(function(i){
						if (theaters.indexOf(i.theatre.name) == -1 ){
							theaters.push(i.theatre.name);
							ticketURLs.push(i.ticketURI);
						}
						
					});

					theaters.forEach(function(i){
						$(currentMovie + ' .theaters').append('<option>' + i);
					});
					console.log(ticketURLs);
				}



		});


		
		//Restaurant Search API
		var city = $('#city-input').val().trim(); 
		var APIkey = "AIzaSyALJbj11Xt_-8qRs3J4ucmPViDVVl3YBOY";
		var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+"
				+ city + "&key=" + APIkey;


			$.ajax({url: queryURL, method: 'GET'})
		 		.done(function(response) {
		     	
		     	console.log("response: "+response);
		     	var restList = $('<ul class="panel-body list-group" id="restList">');

		     	$('#foodDisplay').append(restList);
		     	for (i=0; i<5; i++) {

		   //   		var restName = response.results[i].name;
					// var restAddress = response.results[i].formatted_address;
					// var restPrice = response.results[i].price_level;
					// var restRating = response.results[i].rating;
					var restID = response.results[i].place_id;

		     		var detailURL = "https://maps.googleapis.com/maps/api/place/details/json?placeid="
						+ restID + "&key=" + APIkey;
						console.log("deets: "+ detailURL);
						console.log("restID: " + restID);

					$.ajax({url: detailURL, method: 'GET'})
		 			.done(function(data) {
		 				console.log('data: '+ JSON.stringify(data, 0,2));
		 				var restName = data.result.name;
		 				var restPhone = data.result.formatted_phone_number;
						var restAddress = data.result.formatted_address;
						var restPrice = data.result.price_level;
						var restRating = data.result.rating;

		 				$(restList).append('<li class="restItem list-group-item">'
		 					+ '<h3>' + restName + '</h3>'
		 					+ '<p>Address: ' + restAddress + '</p>'
		 					+ '<p>Phone Number: ' + restPhone +'</p>'
		 					+ '<p>Rating: ' + restRating + '</p>'
		 					+ '<p>Price Level: ' + restPrice + '</p>'
		 					+ '<a target="_blank" href="'+data.result.website+'">Website:</a><br>'
		 					+ '<a target="_blank" href="'+data.result.url+'">Directions:</a><br>'
		 					+ '<p>Hours: '+'<br>' 
		 						+ data.result.opening_hours.weekday_text[0]+'<br>'
		 						+ data.result.opening_hours.weekday_text[1]+'<br>'
		 						+ data.result.opening_hours.weekday_text[2]+'<br>'
		 						+ data.result.opening_hours.weekday_text[3]+'<br>'
		 						+ data.result.opening_hours.weekday_text[4]+'<br>'
		 						+ data.result.opening_hours.weekday_text[5]+'<br>'
		 						+ data.result.opening_hours.weekday_text[6]+'<br>'
		 					+'</p>'
		 					);

		 			});//end second ajax


		     	}//end for loop

		    
			});//end Ajax call

		 	//More Info Button



	});
});//end doc.ready

$(document).on('click', '.expand', function(){
	var clickedMovie = $(this).parent();
	$(clickedMovie).find('section').toggleClass('hide');
	

});
$(document).on('click', '#buy-tickets', function(){
	window.open()
});
