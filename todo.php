<!Doctype HTML>
<html>
	<head>
		<title>
			To-Do List
		</title>
		<link rel="stylesheet" href="style.css"/>
		<link rel="shortcut icon" href=""/>
		<link href='http://fonts.googleapis.com/css?family=Fenix' rel='stylesheet'>
		<script src = "jquery.js"></script>
		<script src = "script.js"></script>
	</head>
	<body>
		<div id="header">
			<div id="heading">
				<h1>Cool Lists...</h1>
			</div> 
		</div>
		<div id="content">
			<div id="auth_container">		
				<div id="login_container">
					<form id="login_form" action="index.php" method="POST">
						Username: &nbsp &nbsp &nbsp &nbsp <input type="text" id="uname_login" name="uname_login" maxlength='30' class="text_field"/><br/>
						Password: &nbsp &nbsp &nbsp &nbsp &nbsp<input type="password" id="pass_login" name="pass_login" maxlength='30' class="text_field"/><br/>
						<input type="submit" name="login_submit" id="login_submit" class="btn" value="Log in"/><br/>
					</form>
					<p>New Member? <span id="sign">Sign Up</span> for Cool Lists now.</p>
				</div>
				<div id="regis_container" class="hidden container">
					<form id="register_form" action="index.php" method="POST">
						Name: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp<input type="text" id="name_regis" name="name_regis" maxlength='30' class="text_field"/><br/>
						Username: &nbsp &nbsp &nbsp <input type="text" id="uname_regis" name="uname_regis" maxlength='30' class="text_field"/><br/>
						Email: &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp<input type="text" id="email_regis" name="email_regis" maxlength='30' class="text_field"/><br/>
						Password: &nbsp &nbsp &nbsp &nbsp<input type="password" id="pass_regis" name="pass_regis" maxlength='30' class="text_field"/><br/>
						<input type="submit" name="regis_submit" id="regis_submit" class="btn" value="Register"/>
					</form>
					<p>Old User? <span id="log">Sign In</span>. 
				</div>
			</div>
			<div id="info_container">
				<h2>Welcome to Cool Lists...</h2>
				<p>Cool Lists... is a simple app which allows you, the user to create and manage different lists. These lists may contain any information that the user desires to store.</p>
				<p>The innovative features of Cool Lists... are:</p>
				<ul>
					<li>Includes a checkbox for all tasks that allow user to cross out all completed tasks</li>
					<li>Allows the user to add and remove tasks at will</li>
					<li>Built using ajax - that means no more stupid page reloads.</li> 
				</ul> 
			</div>
			<div id="main_container" class="hidden">
				<div id="add_task">
					<form id="add_form" action="index.php" method="POST">
						Add Task: <input type="text" id="task_field" maxlength='30' name="task_field" class="text_field"/> 
						<input type="submit" name="task_submit" id="task_submit" class="btn" value="Add"/>
					</form>
					<form id="logout_form" action="index.php" method="POST">
						<input type="submit" id="logout_submit" name="logout_submit" class="btn" value="log out"/>
					</form>
				</div>
				<div id="list_container">
				</div>
			</div>
		</div>
		<div id="copyright" class="footer_notification hidden">
			<p>Does anybody actually read this stuff... :p</p>
		</div>
		<div id="about" class="footer_notification hidden"> 
				<p>I am a novice programmer currently learning under SDSLabs...</p>
		</div>
		<div id="contact" class="footer_notification hidden">
			<p>Phone Number: +91-9910050857<br/>E-mail: dvjbndlsh93@gmail.com<br/></p>
		</div>
		<div id="footer">
			<span class="links" id="copy">
				Copyright
			</span>
			<span class="links" id="ab">
				About Me
			</span>
			<span class="links" id="con">
				Contact Me
			</span>
		</div>
	</body>
</html>