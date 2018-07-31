$(document).ready(function() {
	$.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: "garbage"}
    }).then(function(data) {
		alert("Hi: "+ data);
       $('.name-id').append(data[0].name);   
	   //$('.venue-id').append(data[0].id);
    });
	
	$("button").click(function(){
		$.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: $('#venue-in').val()}
    }).then(function(data) {
       $('.name-id').append(data[0].name);	  
    });
	});
});
	
//$(document).on('click', '#venue-btn', function () {	
