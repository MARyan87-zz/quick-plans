$('#submit-button').on('click', function(){
	var startDate = $('#date-input').val();
	var zipCode = $('#zip-input').val();

	var api = 'data.tmsapi.com/v1.1/movies/showings?startDate=' + startDate + '&zip=' + zipCode + '&api_key=3c7u9b4fnquyfbbkqzc2tzgj';


	$.ajax({url: api, method: 'GET'})
		.done(function(data){
			

	});
});

