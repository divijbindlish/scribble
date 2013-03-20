$(document).ready(function(){

	//code for showing sign up and login forms
	$('#sign').click(function(){
		$('#login_container').fadeOut('fast');
		$('#regis_container').fadeIn('fast');
		$('#auth_container').css("height","50%");
	});
	$('#log').click(function(){
		$('#login_container').fadeIn('fast');
		$('#regis_container').fadeOut('fast');
		$('#auth_container').css("height","30%")
	});

	//code for footer
	$('.links').mouseenter(function(){
		var id = $(this).attr('id');
		if(id=="ab"){
			$('#about').fadeIn('fast');
		}
		if(id=="con"){
			$('#contact').fadeIn('fast');
		}
		if(id=="copy"){
			$('#copyright').fadeIn('fast');
		}
		$('.links').mouseleave(function(){
			$('.footer_notification').fadeOut('fast');
		});
	});

	/*
	 *
	 Code for validating registeration data begins
	 *
	 */

	//Code for checking name of user
	$('name_regis').keypress(function(){
		var name = $(this).val();
		if(name.length<5){
			$('#auth_notification').fadeIn('fast');
			$('#auth_notification').html('<p>Name too short</p>');
			$('#regis_form>#cross1').fadeIn('fast');
			$('#regis_form>#tick1').fadeOut('fast');
		}
		else if(/^[a-zA-Z0-9]*$/.test(str) == false){
			$('#auth_notification').fadeIn('fast');
			$('#auth_notification').html("<p>Name contains illegal characters<p>");
			$('#regis_form>#cross1').fadeIn('fast');
			$('#regis_form>#tick1').fadeOut('fast');
		}
		else{
			$('#auth_notification').fadeOut('fast');
			$('#regis_form>#cross1').fadeOut('fast');
			$('#regis_form>#tick1').fadeIn('fast');
		}
	});

	//Code for checking both password fields
	$('confirm_regis').keypress(function(){
		var conf = $(this).val();
		var orig = $('pass_regis').val();
		if(conf==orig){
			$('#regis_form>#tick4').fadeIn('fast');
			$('#regis_form>#tick5').fadeIn('fast');
			$('#regis_form>#cross4').fadeOut('fast');
			$('#regis_form>#cross5').fadeOut('fast');
			$('#auth_notification').fadeOut('fast');
		}
		else{
			$('#regis_form>#cross4').fadeIn('fast');
			$('#regis_form>#cross5').fadeIn('fast');
			$('#regis_form>#tick4').fadeOut('fast');
			$('#regis_form>#tick5').fadeOut('fast');
			$("#regis_form>#auth_notification").html("<p>Both the passwords do not match</p>");
			$('#auth_notification').fadeIn('fast');
		}
	});

});