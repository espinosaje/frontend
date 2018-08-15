$(document).ready(function() {
	//var $venues = $('#venues');
	
	// if its "1", implement functionallity to look for the exact venue by pushing a button based on 3 fields
	// if it's "0", show a list of venues matching the name and select the correct one
	var venueSearch = 1;
	var venue_data;
	
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
					$('.venue-div').append('<li>Venue Found:'+venue.name+'</li><li>, @'+venue.city.name+' </li>');
					dynamic_list = dynamic_list + '<li>name:'+venue.name+' @ city: '+venue.city.name+' </li>';
				});
				
				var dialog = selectDialog('Pan',dynamic_list);
				//dialog.dialog( "open" );
			});
		}
	});
	
	//look for specific vanue by name and location (alternative to showing list)
	$("#venue-btn").click(function(){		
		var p_venue = $('#venue-in').val();
		var p_city = $('#city-in').val();
		var p_state = $('#state-in').val();
		
		$('.venue-div li').remove();
		
		$.ajax({
		statusCode: {
		  500: function() {			
			$('.venue-div').append('<li>Venue NOT Found </li>');
		   }
		},	
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/venue",		
		data: { name: p_venue,
				cityName: p_city,
				stateCode: p_state}
		}).then(function(data) {
			if (data != null){
				$('.venue-div').append('<li>Venue Found:'+data[0].name+', @'+data[0].city.name+' </li>');
				venue_data = data[0];
			}
		  
		});
	});
	
	//looks for an artists on blur, returns only the exact match
	//ToDo: there could be 2 artist with the exact match, will need to select from a list if this is the case
	$("#band-in").blur(function(){		
		var band = $('#band-in').val();
		//var p_city = $('#date-in').val();
		
		$('.band-div li').remove();
		
		$.ajax({
		statusCode: {
		  500: function() {			
			$('.band-div').append('<li>Band NOT Found </li>');
		   }
		},	
        url: "http://localhost:8081/maven_rest_ws-0.1.0/setlist/artist",		
		data: { 
			artistName: band
		}
		}).then(function(data) {
			if (data != null){
				$('.band-div').append('<li>Band Found:'+data.name+', id:'+data.mbid+' </li>');
			}
		  
		});
	});
	
	//add an EVENT with an artist (In progress - ToDo)
	$("#event-btn").click(function(){		
		var p_band = $('#band-in').val();
		var p_date = $('#date-in').val();
		
		$('.band-div li').remove();
		
		$.ajax({
		statusCode: {
		  500: function() {			
			$('.band-div').append('<li>Couldn''t create event</li>');
		   }
		},	
        url: "http://localhost:8081/maven_rest_ws-0.1.0/event/add",		//?name=Tool&venue=3&tour=Lateralus&year=2001&fest=0&date=31-10-2001
		data: { name: p_band,
				venue: venue_data.id,
				tour: p_state}
		}).then(function(data) {
			if (data != null){
				$('.band-div').append('<li>Band Found:'+data[0].name+', @'+data[0].city.name+' </li>');
			}
		  
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
