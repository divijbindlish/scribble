$(document).ready(function(){

	//function to check whether string is numeric
	function isInt(input){
		return ((input-0)==input && input%1==0);
	}

	$('#main_container').hide();

	//to strike or unstrike the tasks depending on the checkbox
	$('.check').click(function(){
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
				var test = response.substring(0,4);
				if(test=="fail"){
					$('#notification').html("Incorrect Username or Password");
					$('#uname_login').val('');
					$('#pass_login').val('');
				}
				else if(test=="succ"){
					var data = response.substring(7);
					$('#notification').html("Login Successful");
					$('#login_container').hide();
					$('#main_container').show();
					$('#main_list').html(data);
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
				if(response=="success"){
					$('#notification').html("Welcome "+$('#uname_regis').val());
					$('#login_container').hide();
					$('#main_container').show();
					$('#main_list').html("");
				}
			},
			error: function(response){
				$('#notification').html("Some error with script");
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
				$('#main_container').hide();
				$('#main_container').html("");
				$('#login_container').show();
				$('#notification').html("Log out successful");
				$('input[type="text"]').val('');
				$('input[type="password"]').val('');
			},
			error: function(response){
				$("#notification").html("Some error with script");
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
				var test = response.substring(0,4);
				if(test=="fail"){
					$('#notification').html("Something went wrong");
				}
				else{
					var data = response.substring(7);
					$('#notification').html("Item addition successful");
					$('#task_field').val('');
					$('#main_list').html(data);
				}
			}
		});
	});

	//ajax code for remove button
	$('.remove_button').click(function(e){
		e.preventDefault();
		console.log("reload stopped");
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