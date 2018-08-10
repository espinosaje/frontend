$(document).ready(function() {
	//var $venues = $('#venues');
	
	// if its "1", implement functionallity to look for the exact venue by pushing a button based on 3 fields
	// if it's "0", show a list of venues matching the name and select the correct one
	var venueSearch = 1;
	
	if (venueSearch == 0){
		$('#venue-location').hide();
	}
	
	//populate the list when loosing focus and display a list of matching venues
	$("input").blur(function(){
		if (venueSearch == 0){
			$.ajax({
			url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
			data: { name: $('#venue-in').val()}
			}).then(function(data) {
			   //$('.name-id').html(data[0].name);
				$('.venue-div li').remove();
				var dynamic_list = '';
				$.each(data,function(i,venue){
					//$('.venue-div').append('<li>- name:'+venue.name+'</li><li>city:'+venue.city.name+' </li>');
					dynamic_list = dynamic_list + '<li>name:'+venue.name+' @ city: '+venue.city.name+' </li>';
				});
				
				var dialog = selectDialog('Pan',dynamic_list);
				//dialog.dialog( "open" );
			});
		}
	});
	
	//look for specific vanue by name and location (alternative to showing list)
	$("button").click(function(){
		//ToDo: Read the selected LI from the "venue-div" and send those as parameters for "/event/add"
		var p_venue = $('#venue-in').val();
		var p_city = $('#city-in').val();
		var p_state = $('#state-in').val();

		$.ajax({
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: p_venue,
				cityName: p_city,
				stateCode: p_state}
		}).then(function(data) {
		   //selectDialog('Pan','You had selected, Text: '+ $('#venue-in').val()+' And Value : '+data[0].name);	
		   alert ('result: '+data);
		});
	});
	
	//ToDO: capture the selected LI. Might need to change from LI to input or something
	$('.popup-div').click(function(){
		//ToDo: Read the selected LI from the "venue-div" and send those as parameters for "/event/add"
		alert ($(this).text());

	});
	
	//trying to make it selectable, not working yet
	/*$( function() {
		$('.popup-div').menu();
	} );*/
	
	//NOT being used now, need to find a way to use it but make the list selectable
	function selectDialog(title, text) {    
            return $('.popup-div').append(text).dialog({
                resizable: true,
                modal: true,
                buttons: {
                    "Close": function() {
                        $(this).dialog("close");
                    }
                },
				close: function() {
					$('.popup-div li').remove();
				}
            });
    }
	
	
});
	
//$(document).on('click', '#venue-btn', function () {	
