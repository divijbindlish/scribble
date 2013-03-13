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

	/**
		ajax code begins
	**/

	//ajax code for login button
	$('#login_submit').click(function(e){
		e.preventDefault();
		console.log("reload stopped");
		$.ajax({
			type: "POST",
			url: "index.php",
			data: {uname_login: $('#uname_login').val(), pass_login: $('#pass_login').val(), login_submit: "log"},
			datatype: "html",
			success: function(response){
				$('#notification').html(response.substring(0,4));
				if(response=="fail"){
					$('#notification').html("Incorrect Username or Password");
					$('#uname_login').val('');
					$('#pass_login').val('');
				}
				else if(response=="success"){
					$('#notification').html("Login Successful");
					$('#login_container').hide();
					$('#main_container').show();
				}
			},
			error: function(response){
				$('#notification').html("Some error with script");
			}
		});
	});

	//ajax code for register button
	$('#regis_submit').click(function(e){
		e.preventDefault();
		console.log("reload stopped");
		$.ajax({
			type: "POST",
			url: "index.php",
			data: {regis_submit: "regis", name_regis: $('#name_regis').val(), uname_regis: $('#uname_regis').val(), email_regis: $('#email_regis').val(), pass_regis: $('#pass_regis').val()},
			datatype: "html",
			success: function(response){
				$('#main_container').show().siblings().hide();
			}
		});
	});

	//ajax code for logout button
	$('#logout_submit').click(function(e){
		e.preventDefault();
		console.log("reload stopped");
		$.ajax({
			type: "POST",
			url: "index.php",
			data: {logout_submit: "logout"},
			datatype: "html",
			success: function(response){
				$('#main_container').hide().siblings().show();
			}
		});
	});

	//ajax code for add button
	$('#task_submit').click(function(e){
		e.preventDefault();
		console.log("reload stopped");
		$.ajax({
			type: "POST",
			url: "index.php",
			data: {task_submit: "task", task_field: $('#task_field').val()},
			datatype: "html",
			success: function(response){
				console.log("partial success");
			}
		});
	});

	//ajax code for remove button
	$('remove_button').click(function(e){
		e.preventDefault();
		console.log("relad stopped");
		var identifier = $(this).attr('id').substring(0,2);
		if(!isInt(identifier)) identifier = identifier.substring(0,1);
		$.ajax({
			type: "POST",
			url: "index.php",
			data: {remove_button: "remove", id: identifier},
			datatype: "html",
			success: function(response){
				console.log("partial success");
			}
		});
	});

});