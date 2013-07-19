<?php
    session_start();
    $config = include './config/config.php';

    $db = new PDO("mysql:host=".$config['DB_HOST'].";dbname=".$config['DB_NAME'], $config['DB_USER'], $config['DB_PASS']);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  //function to return all the data in the sql table
  function getData($name){
    global $db;
    $q = $db->query("SELECT * FROM $name");
    if(!$q)
      return "";
    $data = "";
    while($row = $q->fetch(PDO::FETCH_OBJ)) {
      $no = $row->serialno;
      $content = $row->list1item;
      $imp = "<div id='$no' class='list_item'><form method='POST' action='index.php'><input type='submit' value='&#10006' class='remove_button hidden' name='remove_button btn' id='".$no."btn'/></form><input type='checkbox' class='check' id='".$no."cb'/><span>$content</span></div>";
      $data = $data.$imp."\n";
    }
    return $data;
  }

  /*
    Code for registering new user begins
  */
  if(isset($_POST['regis_submit'])){

    //get all form data using for each loop
    $data = "";
    foreach($_POST as $key => $value)
      if($key!="regis_submit")
        $data = "$data,'$value'";
    $data = substr($data, 1);

    //create new record in table users
    $q = $db->query("INSERT INTO users VALUES ($data)");
    if($q){
      $db->query("CREATE TABLE ".$_POST['uname_regis']."(serialno INT NOT NULL AUTO_INCREMENT, list1item VARCHAR(30), PRIMARY KEY (serialno))");
      $_SESSION["user"] = $_POST["uname_regis"]
      echo "success";
    }
    else
      echo "fail";

  }

  /*
    Code for Login Form Begins
  */
  if(isset($_POST['login_submit'])){
    $uname = $_POST['uname_login'];
    $q = $db->prepare("SELECT pwd FROM users WHERE uname = ?");
    $q->execute(array($uname));
    if($row = $q->fetch(PDO::FETCH_OBJ))
      $pass = $row->pwd;
    if($_POST['pass_login'] == $pass){
      $_SESSION["user"] = $uname;
      echo "success".getData($uname);
    }
    else
      echo "fail";
  }

  /*
    Code for adding new list item begins
  */
  if(isset($_POST['task_submit'])){
    $item = $_POST['task_field'];
    $uname = $_SESSION["user"];
    $q = $db->query("INSERT INTO $uname(list1item) VALUES ('$item')");
    if($q)
      echo "success".getData($uname);
    else
      echo "fail";
  }

  /*
    Code for removing an item begins
  */
  if(isset($_POST["remove_button"])){
    $no = $_POST["id"];
    $q = $db->query("DELETE FROM ".$_SESSION["user"]." WHERE serialno='$no'");
    if($q)
      echo "success";
    else
      echo "fail";
  }

?>
