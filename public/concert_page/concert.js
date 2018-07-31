$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/event/get",
		data: { name: "garbage"}
    }).then(function(data) {
		alert("Hi: "+ data);
       $('.name-id').append(data[0].name);
	   $('.venue-id').append(data[0].venue);	
    });
});

