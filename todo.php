<!Doctype HTML>
<html>
	<head>
		<title>
			To-Do List
		</title>
		<link rel="stylesheet" href="style.css"/>
		<script src = "jquery.js"></script>
		<script src = "script.js"></script>
	</head>
	<body>
		<div id="login_container" class="container">
			<form id="register_form" action="log.php" method="POST">
				Name: <input type="text" id="name_regis" name="name_regis" class="text_field"/><br/>
				Username: <input type="text" id="uname_regis" name="uname_regis" class="text_field"/><br/>
				Email: <input type="text" id="email_regis" name="email_regis" class="text_field"/><br/>
				Password: <input type="password" id="pass_regis" name="pass_regis" class="text_field"/><br/>
				<input type="submit" name="regis_submit" id="regis_submit" class="button" value="submit"/>
			</form>
			<form id="login_form" action="log.php" method="POST">
				Username: <input type="text" id="uname_login" name="uname_login" class="text_field"/><br/>
				Password: <input type="password" id="pass_login" name="pass_login" class="text_field"/><br/>
				<input type="submit" name="login_submit" id="login_submit" class="button" value="submit"/>
			</form>
		</div>
		<div id="main_container" class="container">
			<div id="add_task">
				<form id="add_form" action="add.php" method="POST">
					Add Task: <input type="text" id="task_field" name="task_field" class="text_field"/> 
					<input type="submit" name="task_submit" id="task_submit" class="button" value="add"/>
				</form>
			</div>
			<div id="main_list">
			</div>
		</div>
	</body>
</html>