$(document).ready(function(){

	//function to check whether string is numeric
	function isInt(input){
		return ((input-0)==input && input%1==0);
	}

	//function to get the value stored by the cookie
	function getCookie(name){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }

	if(document.cookie.indexOf("user")>=0){
		var user = getCookie("user");
		$.ajax({
			type: "POST",
			url: "todo.php",
			data: {username: user, usingcookie: "true"},
			datatype: "html",
			success: function(response){
				if(response.substring(0,4)=="succ"){
					var data = response.substring(7);
					$('#user_container').fadeIn('fast');
					$('#auth_container').fadeOut('fast');
					$('#main_container').fadeIn('fast');
					$('#info_container').fadeOut('fast');
					$('#list_container').html(data);
					$('#header>#heading').css("left","10%");
					$('#user_name').html("<h2>"+user+"</h2>");
					dyna();
				}
			}
		});
	}

	//function created to add listener for every new item created
	function dyna(){

		//to strike or unstrike the tasks depending on the checkbox
		$('.check').click(function(){
			var identifier = $(this).attr('id').substring(0,2);
			if(!isInt(identifier)) identifier = identifier.substring(0,1);
			var use1,use2;
			use1="#"+identifier;
			use2="#"+identifier+"btn";
			if($(this).is(':checked')){
				$(use1).addClass('done');
				$(use2).fadeIn('fast');
			}
			else{
				$(use1).removeClass('done');
				$(use2).fadeOut('fast');
			}
		});

		//ajax code for remove button
		$('.remove_button').click(function(e){
			e.preventDefault();
			var identifier = $(this).attr('id').substring(0,2);
			if(!isInt(identifier)) identifier = identifier.substring(0,1);
			$.ajax({
				type: "POST",
				url: "todo.php",
				data: {remove_button: "remove", id: identifier},
				datatype: "html",
				success: function(response){
					if(response=="fail"){
						$('#notification').html("Removal of item failed");
					}
					else{
						$('#'+identifier).remove();
						$('#notification').html("Removal of item successful");
					}
				},
				error: function(){
				}
			});
		});
	}

	/**
		ajax code begins
	**/

	//ajax code for login button
	$('#login_submit').click(function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "todo.php",
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
					var user = $('#uname_login').val();
					if($('#remember').is(':checked')){
						var c_name = "user";
						document.cookie=c_name+"="+user;
					}
					$('#user_container').fadeIn('fast');
					$('#auth_container').fadeOut('fast');
					$('#main_container').fadeIn('fast');
					$('#info_container').fadeOut('fast');
					$('#list_container').html(data);
					$('#header>#heading').css("left","10%");
					$('#user_name').html("<h2>"+user+"</h2>");
					dyna();
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
		$.ajax({
			type: "POST",
			url: "todo.php",
			data: {regis_submit: "regis", name_regis: $('#name_regis').val(), uname_regis: $('#uname_regis').val(), email_regis: $('#email_regis').val(), pass_regis: $('#pass_regis').val()},
			datatype: "html",
			success: function(response){
				if(response=="success"){
					var user = $('#uname_regis').val();
					$('#auth_container').fadeOut('fast');
					$('#main_container').fadeIn('fast');
					$('#info_container').fadeOut('fast');
					$('#header>#heading').css("left","10%");
					$('#user_name').html("<h2>"+user+"</h2>");
					$('#user_container').fadeIn('slow');
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
		$.ajax({
			type: "POST",
			url: "todo.php",
			data: {logout_submit: "logout"},
			datatype: "html",
			success: function(response){
				$('#user_container').fadeOut('fast');
				$('#main_container').fadeOut('fast');
				$('#list_container').html("");
				$('#auth_container').fadeIn('fast');
				$('#info_container').fadeIn('fast');
				$('input[type="text"]').val('');
				$('input[type="password"]').val('');
				$('#header>#heading').css('left','43%');
				$('#user_name').html("");
				document.cookie="user=deleted; expires="+new Date(0).toUTCString();
			},
			error: function(response){
				$("#notification").html("Some error with script");
			}
		});
	});

	//ajax code for add button
	$('#task_submit').click(function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "todo.php",
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
					$('#list_container').html(data);
					dyna();
				}
			},
			error: function(){
				console.log("shit got fucked up");
			}
		});
	});
});