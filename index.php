<?php
	
	//start the session
	session_start();

	//set the session variable if cookie is defined
	if(isset($_COOKIE["user"])) $_SESSION["user"]=$_COOKIE["user"];

	//create connection with mysql database
	$con = mysql_connect("localhost","root","hello123");

	//check whether connection is made
	if (!$con){
  	die("Failed to connect to MySQL: " . mysql_error());
  }

  //use database todo_list
  mysql_select_db('todo_list');

  //create a table for storing information about all the users
	$sql = "CREATE TABLE users(name VARCHAR(30), uname VARCHAR(30), email VARCHAR(30), pwd VARCHAR(30));";
	mysql_query($sql,$con);

	/*
		Code for registering new user begins
	*/
	if(isset($_POST['regis_submit'])){
		
		//get all form data using for each loop
		$data = "";
		$flag = true;
		foreach($_POST as $key => $value){
			if($key!="regis_submit"){
				if($value==""){
					echo "empty";
					$flag=false;
					break;
				}
				$data=$data.",'".$value."'";
			}
		}
		$data=substr($data,1);

		//create new record in table users
		if($flag){
			$sql = "INSERT INTO users VALUES (".$data.");";
			if(mysql_query($sql,$con)){
				$_SESSION["user"]=$_POST["uname_regis"];
				setcookie("user",$_POST["uname_regis"],time()+3600);
				$sql = "CREATE TABLE ".$_POST['uname_regis']."(serialno INT NOT NULL AUTO_INCREMENT, list1item VARCHAR(30), PRIMARY KEY (serialno));";
				echo $sql;
				$check = mysql_query($sql,$con);
				if($check) echo "successful";
				else echo mysql_error();
			}
		}

	}

	/*
		Code for Login Form Begins
	*/
	if(isset($_POST['login_submit'])){
		$uname = $_POST['uname_login'];
		$sql = "SELECT pwd FROM users WHERE uname = '$uname';";
		$check = mysql_query($sql,$con);
		$row = mysql_fetch_array($check,MYSQL_ASSOC);
		if($row){
			$pass = $row['pwd'];
		}
		if($_POST['pass_login']==$pass){
			$_SESSION["user"]=$uname;
			setcookie("user",$uname,time()+3600);
			echo "successful";
		}
		else{
			echo "failed";
		}
	}

	/*
		Code for adding new list item begins
	*/
	if(isset($_POST['task_submit'])){
		$item = $_POST['task_field'];
		if($item!=""){
			//$sql = "SELECT COUNT(*) FROM ".$_SESSION["user"].";";
			//$check = mysql_query($sql,$con);
			//$row = mysql_fetch_array($check,MYSQL_ASSOC);
			//if($row){
			//	$no = $row['COUNT(*)']+1;
			//}"su
			$sql = "INSERT INTO ".$_SESSION["user"]."(list1item) VALUES ('".$item."');";
			$check = mysql_query($sql,$con);
			if($check){
				echo "successful";
			}
			else{
				echo mysql_error();
			}
		}
		else echo "empty";
	}

	/* 
		Code for removing an item begins
	*/
	if(isset($_POST["remove_button"])){
		$no = $_POST["id"];
		$sql = "DELETE FROM ".$_SESSION["user"]." WHERE serialno='".$no."';";
		$check = mysql_query($sql,$con);
		if($check){
			echo "successful";
		}
		else{
			echo "failed";
		}
	}

	/*
		Code for logout begins
	*/
	if(isset($_POST["logout_submit"])){
		session_destroy();
		setcookie("user","",time()-3600);
		header('Location: todo.php');
	}

?>

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
			<form id="register_form" action="#" method="POST">
				Name: <input type="text" id="name_regis" name="name_regis" class="text_field"/><br/>
				Username: <input type="text" id="uname_regis" name="uname_regis" class="text_field"/><br/>
				Email: <input type="text" id="email_regis" name="email_regis" class="text_field"/><br/>
				Password: <input type="password" id="pass_regis" name="pass_regis" class="text_field"/><br/>
				<input type="submit" name="regis_submit" id="regis_submit" class="button" value="submit"/>
			</form>
			<form id="login_form" action="#" method="POST">
				Username: <input type="text" id="uname_login" name="uname_login" class="text_field"/><br/>
				Password: <input type="password" id="pass_login" name="pass_login" class="text_field"/><br/>
				<input type="submit" name="login_submit" id="login_submit" class="button" value="submit"/>
			</form>
		</div>
		<div id="main_container" class="container">
			<div id="add_task">
				<form id="add_form" action="#" method="POST">
					Add Task: <input type="text" id="task_field" name="task_field" class="text_field"/> 
					<input type="submit" name="task_submit" id="task_submit" class="button" value="add"/>
				</form>
				<form id="logout_form" action="#" method="POST">
					<input type="submit" id="logout_submit" name="logout_submit" class="button" value="log out"/>
				</form>
			</div>
			<div id="main_list">
				<?php
					$sql = "SELECT * FROM ".$_SESSION['user'].";";
					$check = mysql_query($sql,$con);
					while($row = mysql_fetch_array($check,MYSQL_ASSOC)){
						$no = $row['serialno'];
						$content = $row['list1item'];
						$content = "<div id='".$no."' class='list_item'><form method='POST' action='#'><input type='submit' value='' class='remove_button hidden' name='remove_button' id='".$no."btn'/><input type='hidden' name='id' value='$no'/></form><input type='checkbox' class='check' id='".$no."cb'/>$content</div>";
						echo $content;
					}
				?>
			</div>
		</div>
	</body>
</html>