$(document).ready(function() {
	//var $venues = $('#venues');

	//populate the list when loosing focus
	$("input").blur(function(){
		$.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: $('#venue-in').val()}
		}).then(function(data) {
		   //$('.name-id').html(data[0].name);
			$('.venue-div li').remove();
			$.each(data,function(i,venue){
				//$('.venue-div').append('<li>name:'+venue.name+', city:'+venue.city.name+' </li>');
				$('.venue-div').append('<li>- name:'+venue.name+'</li><li>city:'+venue.city.name+' </li>');
			});
		});
	});
	
	//do something with the button, open a pop-up
	$("button").click(function(){
		//ToDo: Read the selected LI from the "venue-div" and send those as parameters for "/event/add"
		var venue_params = $('#venue-in').val();

		$.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: venue_params}
		}).then(function(data) {
		   selectDialog('Pan','You had selected, Text: '+ $('#venue-in').val()+' And Value : '+data[0].name);	
		});
	});
	
	function selectDialog(title, text) {    
            return $('<div></div>').append(text).dialog({
                resizable: true,
                modal: true,
                buttons: {
                    "OK": function() {
                        $(this).dialog("close");
                    }
                }
            });
        }
	
	
});
	
//$(document).on('click', '#venue-btn', function () {	
