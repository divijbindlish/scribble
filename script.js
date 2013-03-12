$(document).ready(function(){

	//function to check whether string is numeric
	function isInt(input){
		return ((input-0)==input && input%1==0);
	}

	//if user is already logged in show list else show login form
	if(document.cookie.indexOf('user') < 0){
		$('#login_container').show().siblings().hide();
	}
	else{
		$('#main_container').show().siblings().hide();
	}

	//to strike or unstrike the tasks depending on the checkbox
	$('.check').click(function(){
		console.log($(this).attr('id'));
		var identifier = $(this).attr('id').substring(0,2);
		if(!isInt(identifier)) identifier = identifier.substring(0,1);
		var use1,use2;
		use1="#"+identifier;
		use2="#"+identifier+"btn";
		if($(this).is(':checked')){
			$(use1).addClass('done');
			$(use2).fadeIn('slow');
		}
		else{
			$(use1).removeClass('done');
			$(use2).fadeOut('slow');
		}
	});

	//ajax code begins
	//$()

});