$(document).ready(function() {
	//var $venues = $('#venues');

	//populate the list when loosing focus
	$("input").blur(function(){
		$.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: $('#venue-in').val()}
		}).then(function(data) {
		   //$('.name-id').html(data[0].name);	
			$.each(data,function(i,venue){
				$('.venue-div').append('<li>name:'+venue.name+' </li>');
			});
		});
	});
	
	//do something with the button, open a pop-up
	$("button").click(function(){
		$.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: $('#venue-in').val()}
		}).then(function(data) {
		   alert("Do sone shit");		
		});
	});
	
	
});
	
//$(document).on('click', '#venue-btn', function () {	
