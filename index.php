<?php
	
	//start the session
	session_start();

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

	function getData($name){
		global $con;
		$sql = "SELECT * FROM ".$name.";";
		$check = mysql_query($sql,$con);
		if(!$check) return "";
		$data="";
		while($row = mysql_fetch_array($check,MYSQL_ASSOC)){
			$no = $row['serialno'];
			$content = $row['list1item'];
			$imp = "<div id='".$no."' class='list_item'><form method='POST' action='index.php'><input type='submit' value='' class='remove_button hidden' name='remove_button' id='".$no."btn'/></form><input type='checkbox' class='check' id='".$no."cb'/>".$content."</div>";
			$data=$data.$imp."\n";
		}
		return $data;
	}

	/*
		Code for registering new user begins
	*/
	if(isset($_POST['regis_submit'])){
		
		//get all form data using for each loop
		$data = "";
		foreach($_POST as $key => $value){
			if($key!="regis_submit"){
				$data=$data.",'".$value."'";
			}
		}
		$data=substr($data,1);

		//create new record in table users
		$sql = "INSERT INTO users VALUES (".$data.");";
		if(mysql_query($sql,$con)){
			$_SESSION["user"]=$_POST["uname_regis"];
			$sql = "CREATE TABLE ".$_POST['uname_regis']."(serialno INT NOT NULL AUTO_INCREMENT, list1item VARCHAR(30), PRIMARY KEY (serialno));";
			mysql_query($sql,$con);
			echo "success";
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
			echo "success".getData($uname);
		}
		else{
			echo "fail";
		}
	}

	/*
		Code for adding new list item begins
	*/
	if(isset($_POST['task_submit'])){
		$item = $_POST['task_field'];
		$uname = $_SESSION["user"];
		$sql = "INSERT INTO ".$_SESSION["user"]."(list1item) VALUES ('".$item."');";
		$check = mysql_query($sql,$con);
		if($check){
			echo "success".getData($uname);
		}
		else{
			echo "fail";
		}
	}

	/* 
		Code for removing an item begins
	*/
	if(isset($_POST["remove_button"])){
		$no = $_POST["id"];
		$sql = "DELETE FROM ".$_SESSION["user"]." WHERE serialno='".$no."';";
		mysql_query($sql,$con);
	}

	/*
		Code for logout begins
	*/
	if(isset($_POST["logout_submit"])){
		session_destroy();
		session_start();
	}

?>